import { mouseStore } from '../stores/mouseStore'

export type PointerLockChangePayload = { isPointerLocked: boolean }

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: PointerLockChangePayload) => void
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountPointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  const handler = () => {
    const locked = Boolean(document.pointerLockElement)
    mouseStore.setState(s => {
      const newMouse: Mutable<typeof s> = structuredClone(s)
      newMouse.locked = locked
      return newMouse
    })
    onPointerLockChange?.({ isPointerLocked: locked })
  }

  handler()

  document.addEventListener('pointerlockchange', handler)

  return () => document.removeEventListener('pointerlockchange', handler)
}
