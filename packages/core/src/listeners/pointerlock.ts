import { mp } from '../store'

export type PointerLockChangePayload = { isPointerLocked: boolean }

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: PointerLockChangePayload) => void
}

export const mountPointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  const handler = () => {
    const isPointerLocked = Boolean(document.pointerLockElement)
    mp().setPointerLocked(isPointerLocked)
    onPointerLockChange?.({ isPointerLocked })
  }

  handler()

  document.addEventListener('pointerlockchange', handler)

  return () => document.removeEventListener('pointerlockchange', handler)
}
