import { getProject, types } from '@theatre/core'
import heroState from './theatre-state.json'

// Projeto Theatre.js com a timeline do hero já embutida (autorada à mão).
// O scroll faz o scrub da sequência (ver CameraSequence no BlackHoleScene).
const project = getProject('NEXUS', { state: heroState })
export const heroSheet = project.sheet('Hero')

// Objeto "Camera" com props simples (números) animados pela sequência.
export const camObj = heroSheet.object('Camera', {
  z: types.number(6, { range: [-2, 8] }),
  posY: types.number(0, { range: [-3, 3] }),
  fov: types.number(45, { range: [20, 70] }),
})

// (Opcional) Para autorar a timeline na GUI: instale `@theatre/studio` e
// chame `studio.initialize()` aqui — o objeto "Camera" aparece no editor.
