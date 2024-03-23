import { mp } from '../store'

export const handlePointerLockChange =
  ({ onChange }: { onChange?: (isPointerLocked: boolean) => void }) =>
  (_: Event) => {
    const isPointerLocked = Boolean(document.pointerLockElement)
    mp().setPointerLocked(isPointerLocked)
    onChange?.(isPointerLocked)
  }
