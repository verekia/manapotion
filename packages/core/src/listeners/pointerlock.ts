import { mp } from '../store'

export type PointerLockListenerProps = {
  onPointerLockChange?: (isPointerLocked: boolean) => void
}

export const mountPointerLockListener = ({ onPointerLockChange }: PointerLockListenerProps) => {
  const handler = () => {
    const isPointerLocked = Boolean(document.pointerLockElement)
    mp().setPointerLocked(isPointerLocked)
    onPointerLockChange?.(isPointerLocked)
  }

  handler()

  document.addEventListener('pointerlockchange', handler)

  return () => document.removeEventListener('pointerlockchange', handler)
}
