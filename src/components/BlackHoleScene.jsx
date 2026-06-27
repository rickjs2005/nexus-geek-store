import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, Environment } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
  wrapEffect,
} from '@react-three/postprocessing'
import { BlendFunction, Effect } from 'postprocessing'
import * as THREE from 'three'

/* ----------------------------- Buraco negro ----------------------------- */
const BH_VERT = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const BH_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=0.5; } return v; }
  float starLayer(vec2 uv, float thr, float bright){
    vec2 g=floor(uv); float h=hash(g);
    if(h<thr) return 0.0;
    float core=smoothstep(0.5,0.0,length(fract(uv)-0.5));
    float tw=0.45+0.55*sin(uTime*(0.4+h*2.2)+h*50.0);
    return core*bright*((h-thr)/(1.0-thr))*tw;
  }
  float starfield(vec2 uv){
    return starLayer(uv*120.0,0.990,1.0)+starLayer(uv*55.0,0.996,2.4)+starLayer(uv*26.0,0.992,0.5);
  }

  void main(){
    vec2 q = vUv - 0.5;           // plano quadrado -> aspect 1
    float r = length(q);
    float ang = atan(q.y, q.x);
    float rh = 0.20;

    float lens = min(0.30, 0.05/(r+0.04));
    vec2 dir = q/max(r,1e-4);
    vec2 lq = q - dir*lens;

    float nb  = fbm(lq*2.2 + vec2(0.0, uTime*0.006));
    float nb2 = fbm(lq*4.6 - vec2(uTime*0.008, 0.0));
    vec3 nebula = mix(vec3(0.010,0.012,0.020), vec3(0.055,0.038,0.026), smoothstep(0.25,0.85,nb));
    nebula += vec3(0.008,0.022,0.026)*smoothstep(0.55,1.0,nb2)*0.6;
    vec3 bg = nebula*0.85 + vec3(0.82,0.88,1.0)*starfield(lq*0.5+0.5);

    float rot = uTime*0.32;
    float warp = fbm(vec2(ang*2.0+rot, r*5.0));
    float swirl = ang*3.0 - rot*2.0 + (1.0/(r+0.08))*1.1 + warp*1.4;
    float gas  = fbm(vec2(swirl, r*7.0+rot));
    float gas2 = fbm(vec2(swirl*2.0+3.0, r*15.0));
    float diskTex = pow(clamp(0.45+0.8*gas+0.3*gas2,0.0,2.0),1.3);

    float dopp = 0.5 + 1.0*smoothstep(-0.32,0.32,q.x);
    vec3 orange=vec3(0.90,0.36,0.08), gold=vec3(1.0,0.72,0.34), hot=vec3(1.0,0.97,0.88);
    float er = length(vec2(q.x, q.y / 0.78));   // disco elíptico (inclinado)

    // ---- disco de acreção ESPESSO: perfil radial x matéria turbulenta ----
    float diskIn = rh * 1.12, diskOut = rh * 2.7;
    float radial = smoothstep(diskIn - 0.02, diskIn + 0.03, er) * smoothstep(diskOut, diskIn + 0.06, er);
    float gasB = fbm(vec2(swirl * 2.0 + 5.0, er * 20.0 - rot * 2.0));
    float matter = pow(clamp(0.35 + 0.75 * diskTex + 0.4 * gasB, 0.0, 2.2), 1.5);
    float disk = radial * matter;
    vec3 dcol = mix(orange, gold, smoothstep(diskOut, diskIn, er));
    dcol = mix(dcol, hot, smoothstep(diskIn + 0.06, diskIn, er)); // borda interna quase branca
    vec3 col = bg + dcol * disk * dopp * 1.25;

    // horizonte de eventos (preto)
    float core = smoothstep(rh + 0.004, rh, r);
    col *= (1.0 - core);

    // matéria passando NA FRENTE do núcleo
    float band = smoothstep(0.03, 0.0, abs(q.y)) * smoothstep(rh * 2.8, rh * 0.7, r);
    col += mix(gold, hot, smoothstep(0.0, rh * 1.3, abs(r - rh))) * band * diskTex * dopp * 1.1;

    // anel de fóton (mais contido p/ não estourar com o bloom)
    float photon = smoothstep(0.006, 0.0, abs(r - rh * 1.03));
    col += vec3(1.0, 0.92, 0.78) * photon * 1.4;

    // scattering: luz do disco vazando p/ o espaço (queda gradual)
    float scatter = exp(-abs(er - rh * 1.5) * 4.0) * dopp;
    col += gold * scatter * 0.18;

    col *= 1.0 - smoothstep(0.45, 1.0, r) * 0.4;
    gl_FragColor = vec4(col * 0.9, 1.0);
  }
`

function BlackHole() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((s) => (uniforms.uTime.value = s.clock.elapsedTime))
  return (
    <mesh position={[0, 0, -7]}>
      <planeGeometry args={[22, 22]} />
      <shaderMaterial vertexShader={BH_VERT} fragmentShader={BH_FRAG} uniforms={uniforms} depthWrite={false} />
    </mesh>
  )
}

/* ------------------------------- Planeta -------------------------------- */
function Planet() {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.025
  })
  return (
    <group position={[-3.4, 2.1, -6.0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.85, 96, 96]} />
        <meshStandardMaterial color="#2b3340" roughness={0.6} metalness={0.25} flatShading={false} envMapIntensity={0.8} />
      </mesh>
      {/* atmosfera (fresnel aditivo) */}
      <mesh scale={1.08}>
        <sphereGeometry args={[0.85, 64, 64]} />
        <shaderMaterial
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
          uniforms={{ uColor: { value: new THREE.Color('#4fa8ff') } }}
          vertexShader={`varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`}
          fragmentShader={`uniform vec3 uColor; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.0-max(dot(vN,vV),0.0),2.2); gl_FragColor=vec4(uColor*f, f); }`}
        />
      </mesh>
    </group>
  )
}

/* ------------------------------ Asteroides ------------------------------ */
function Asteroids({ count = 38 }) {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 13,
        y: -1.4 - Math.random() * 2.6,
        z: 0.5 + Math.random() * 4.0,
        s: 0.1 + Math.random() * 0.55,
        rx: Math.random() * 6.28,
        ry: Math.random() * 6.28,
        rz: Math.random() * 6.28,
        rs: (Math.random() - 0.5) * 0.25,
      })),
    [count],
  )
  useFrame((st) => {
    const t = st.clock.elapsedTime
    data.forEach((d, i) => {
      dummy.position.set(d.x, d.y, d.z)
      dummy.rotation.set(d.rx + t * d.rs, d.ry + t * d.rs * 0.7, d.rz)
      dummy.scale.setScalar(d.s)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#23262f" roughness={1} metalness={0} flatShading />
    </instancedMesh>
  )
}

/* ----------------------- Câmera com parallax suave ---------------------- */
function Rig() {
  useFrame((s) => {
    s.camera.position.x += (s.pointer.x * 0.5 - s.camera.position.x) * 0.03
    s.camera.position.y += (s.pointer.y * 0.3 + 0.0 - s.camera.position.y) * 0.03
    s.camera.lookAt(0, 0, -4)
  })
  return null
}

/* --------------------- Distorção gravitacional (lente) ------------------ */
const LENS_FRAG = /* glsl */ `
  uniform float uStrength;
  uniform float uRing;
  uniform float uAspect;
  void mainUv(inout vec2 uv){
    vec2 c = uv - 0.5;
    c.x *= uAspect;                 // aspecto corrigido
    float d = length(c);
    float defl = uStrength * (uRing * uRing) / (d * d + 0.0008); // deflexão ~ 1/d²
    defl = min(defl, uRing * 1.5);
    defl *= smoothstep(uRing * 0.82, uRing * 1.2, d);            // zero dentro da sombra, ramp fora
    vec2 dir = c / max(d, 1e-4);
    dir.x /= uAspect;
    uv -= dir * defl;               // puxa a amostra p/ dentro -> fundo "entorta" ao redor do buraco
  }
`
class LensingEffect extends Effect {
  constructor({ strength = 0.05, ring = 0.19, aspect = 1.78 } = {}) {
    super('LensingEffect', LENS_FRAG, {
      uniforms: new Map([
        ['uStrength', new THREE.Uniform(strength)],
        ['uRing', new THREE.Uniform(ring)],
        ['uAspect', new THREE.Uniform(aspect)],
      ]),
    })
  }
}
const LensingImpl = wrapEffect(LensingEffect)
function Lensing() {
  const ref = useRef()
  const { size } = useThree()
  useFrame(() => {
    if (ref.current) ref.current.uniforms.get('uAspect').value = size.width / size.height
  })
  return <LensingImpl ref={ref} />
}

export default function BlackHoleScene() {
  return (
    <Canvas
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
    >
      <color attach="background" args={['#04050b']} />
      {/* HDRI CC0 (Poly Haven) — iluminação/reflexos físicos, sem virar fundo */}
      <Environment files="/hdri/space.hdr" />
      <ambientLight intensity={0.1} />
      {/* luz quente da região do buraco negro (cria o crescente no planeta) */}
      <pointLight position={[1.5, 0.6, -3]} intensity={160} distance={60} decay={2} color="#ffb277" />
      <pointLight position={[3, 0, 2]} intensity={20} distance={25} decay={2} color="#3aa0ff" />

      <BlackHole />
      <Planet />
      <Asteroids />
      <Sparkles count={80} scale={[16, 9, 6]} size={1.4} speed={0.25} opacity={0.5} color="#cfe0ff" />

      <Rig />

      <EffectComposer multisampling={2}>
        <Lensing />
        <Bloom intensity={0.5} luminanceThreshold={0.52} luminanceSmoothing={0.3} mipmapBlur />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0008, 0.0008]} />
        <Vignette eskil={false} offset={0.28} darkness={0.8} />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.45} />
      </EffectComposer>
    </Canvas>
  )
}
