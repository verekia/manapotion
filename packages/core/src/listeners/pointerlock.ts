import { mp } from '../store'

export const mountPointerLockListener = (onChange?: (isPointerLocked: boolean) => void) => {
  const handler = () => {
    const isPointerLocked = Boolean(document.pointerLockElement)
    mp().setPointerLocked(isPointerLocked)
    onChange?.(isPointerLocked)
  }

  handler()

  document.addEventListener('pointerlockchange', handler)

  return () => document.removeEventListener('pointerlockchange', handler)
}
