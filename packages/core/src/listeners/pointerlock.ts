import { mp } from '../store'

export const mountPointerLockListener = ({
  onUpdate,
}: {
  onUpdate?: (isPointerLocked: boolean) => void
}) => {
  const handler = () => {
    const isPointerLocked = Boolean(document.pointerLockElement)
    mp().setPointerLocked(isPointerLocked)
    onUpdate?.(isPointerLocked)
  }

  handler()

  document.addEventListener('pointerlockchange', handler)

  return () => document.removeEventListener('pointerlockchange', handler)
}
