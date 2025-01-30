import { mouseStore } from '../stores/mouseStore'

export type PointerLockChangePayload = { isPointerLocked: boolean }

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: PointerLockChangePayload) => void
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountPointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  const update = () => {
    const locked = Boolean(document.pointerLockElement)
    mouseStore.setState(s => {
      const newMouse: Mutable<typeof s> = structuredClone(s)
      newMouse.locked = locked
      return newMouse
    })
    const payload: PointerLockChangePayload = { isPointerLocked: locked }
    return payload
  }

  const handleChange = () => {
    const payload = update()
    onPointerLockChange?.(payload)
  }

  update()

  document.addEventListener('pointerlockchange', handleChange)

  return () => document.removeEventListener('pointerlockchange', handleChange)
}
