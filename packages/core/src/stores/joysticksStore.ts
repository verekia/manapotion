import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type Joystick = {
  isActive: boolean
  identifier: number | null
  origin: {
    x: number | null
    y: number | null
    angle: number | null
    distance: number | null
    distanceRatio: number | null
  }
  follow: {
    x: number | null
    y: number | null
    angle: number | null
    distance: number | null
    distanceRatio: number | null
  }
  current: { x: number | null; y: number | null }
  movement: { x: number; y: number }
}

export const createJoystick = (): Joystick => ({
  isActive: false,
  identifier: null,
  origin: { x: null, y: null, angle: null, distance: null, distanceRatio: null },
  follow: { x: null, y: null, angle: null, distance: null, distanceRatio: null },
  current: { x: null, y: null },
  movement: { x: 0, y: 0 },
})

export type Joysticks = {
  movement: Joystick
  rotation: Joystick
}

const defaultJoysticks: Joysticks = {
  movement: createJoystick(),
  rotation: createJoystick(),
}

export const joysticksStore = createStore<Joysticks>()(
  devtools(() => structuredClone(defaultJoysticks), { name: 'joysticks' }),
)

export const getJoysticks = joysticksStore.getState

export const resetJoysticks = () => joysticksStore.setState(() => structuredClone(defaultJoysticks))
