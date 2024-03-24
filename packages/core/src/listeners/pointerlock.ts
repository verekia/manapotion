import { mp } from '../store'

export type PointerLockListenerProps = {
  onUpdate?: (isPointerLocked: boolean) => void
}

export const mountPointerLockListener = ({ onUpdate }: PointerLockListenerProps) => {
  const handler = () => {
    const isPointerLocked = Boolean(document.pointerLockElement)
    mp().setPointerLocked(isPointerLocked)
    onUpdate?.(isPointerLocked)
  }

  handler()

  document.addEventListener('pointerlockchange', handler)

  return () => document.removeEventListener('pointerlockchange', handler)
}
