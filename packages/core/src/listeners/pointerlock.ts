import { manaPotionStore } from '../store'

export type PointerLockChangePayload = { isPointerLocked: boolean }

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: PointerLockChangePayload) => void
}

export const mountPointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  const handler = () => {
    const locked = Boolean(document.pointerLockElement)
    manaPotionStore.setState(s => ({ ...s, mouse: { ...s.mouse, locked } }))
    onPointerLockChange?.({ isPointerLocked: locked })
  }

  handler()

  document.addEventListener('pointerlockchange', handler)

  return () => document.removeEventListener('pointerlockchange', handler)
}
