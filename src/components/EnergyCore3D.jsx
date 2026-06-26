import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// Núcleo de energia 3D: icosaedro emissivo + casca wireframe + anel orbital
// + partículas, tudo com bloom. Reage ao mouse (parallax/orbit suave).
export default function EnergyCore3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let width = mount.clientWidth
    let height = mount.clientHeight
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // --- Núcleo interno (emissivo) ---
    const coreGeo = new THREE.IcosahedronGeometry(1.25, 1)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x021018,
      emissive: new THREE.Color(0x6c3bff),
      emissiveIntensity: 1.4,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    // --- Casca wireframe externa ---
    const shellGeo = new THREE.IcosahedronGeometry(1.95, 1)
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
    const shell = new THREE.Mesh(shellGeo, shellMat)
    group.add(shell)

    // --- Casca externa de pontos ---
    const dotGeo = new THREE.IcosahedronGeometry(2.45, 2)
    const dotMat = new THREE.PointsMaterial({
      color: 0x00ffb2,
      size: 0.035,
      transparent: true,
      opacity: 0.9,
    })
    const dots = new THREE.Points(dotGeo, dotMat)
    group.add(dots)

    // --- Anel orbital ---
    const ringGeo = new THREE.TorusGeometry(2.9, 0.018, 16, 120)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, transparent: true, opacity: 0.8 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.2
    group.add(ring)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.3, 0.01, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x6c3bff, transparent: true, opacity: 0.6 }),
    )
    ring2.rotation.x = Math.PI / 1.7
    ring2.rotation.y = Math.PI / 4
    group.add(ring2)

    // --- Campo de partículas estelar ---
    const starCount = 600
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 6 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0x8fa0ff, size: 0.04, transparent: true, opacity: 0.7 }),
    )
    scene.add(stars)

    // --- Luzes ---
    scene.add(new THREE.AmbientLight(0x2a2f4a, 0.6))
    const p1 = new THREE.PointLight(0x6c3bff, 3, 30)
    p1.position.set(4, 3, 5)
    scene.add(p1)
    const p2 = new THREE.PointLight(0x00c2ff, 3, 30)
    p2.position.set(-4, -2, 4)
    scene.add(p2)

    // --- Bloom ---
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.9, 0.6, 0.1)
    composer.addPass(bloom)
    composer.setSize(width, height)

    // --- Interação por mouse ---
    const target = { x: 0, y: 0 }
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect()
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const clock = new THREE.Clock()
    let raf
    const animate = () => {
      const t = clock.getElapsedTime()
      const speed = reduceMotion ? 0.15 : 1

      core.rotation.x = t * 0.25 * speed
      core.rotation.y = t * 0.32 * speed
      shell.rotation.x = -t * 0.18 * speed
      shell.rotation.y = t * 0.12 * speed
      dots.rotation.y = -t * 0.1 * speed
      ring.rotation.z = t * 0.4 * speed
      ring2.rotation.z = -t * 0.3 * speed
      stars.rotation.y = t * 0.02

      // pulsar do núcleo
      const pulse = 1 + Math.sin(t * 2) * 0.04
      core.scale.setScalar(pulse)
      coreMat.emissiveIntensity = 1.2 + Math.sin(t * 2) * 0.4

      // parallax suave do grupo
      group.rotation.y += (target.x * 0.4 - group.rotation.y) * 0.05
      group.rotation.x += (target.y * 0.3 - group.rotation.x) * 0.05

      composer.render()
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      width = mount.clientWidth
      height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      composer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      renderer.dispose()
      composer.dispose?.()
      coreGeo.dispose()
      coreMat.dispose()
      shellGeo.dispose()
      shellMat.dispose()
      dotGeo.dispose()
      dotMat.dispose()
      ringGeo.dispose()
      starGeo.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
