import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type Joystick = {
  isActive: boolean
  identifier: number | null
  originX: number | null
  originY: number | null
  originAngle: number | null
  originDistance: number | null
  originDistanceRatio: number | null
  followX: number | null
  followY: number | null
  followAngle: number | null
  followDistance: number | null
  followDistanceRatio: number | null
  currentX: number | null
  currentY: number | null
  movementX: number
  movementY: number
}

export const createJoystick = (): Joystick => ({
  isActive: false,
  identifier: null,
  originX: null,
  originY: null,
  originAngle: null,
  originDistance: null,
  originDistanceRatio: null,
  followX: null,
  followY: null,
  followAngle: null,
  followDistance: null,
  followDistanceRatio: null,
  currentX: null,
  currentY: null,
  movementX: 0,
  movementY: 0,
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
