import { mp } from '../store'

export const mountMouseButtonsListener = ({
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
}: {
  onLeftMouseDown?: () => void
  onMiddleMouseDown?: () => void
  onRightMouseDown?: () => void
  onLeftMouseUp?: () => void
  onMiddleMouseUp?: () => void
  onRightMouseUp?: () => void
}) => {
  const downHandler = (e: MouseEvent) => {
    if (e.button === 0) {
      mp().setLeftMouseDown(true)
      onLeftMouseDown?.()
    } else if (e.button === 1) {
      mp().setMiddleMouseDown(true)
      onMiddleMouseDown?.()
    } else if (e.button === 2) {
      mp().setRightMouseDown(true)
      onRightMouseDown?.()
    }
  }

  const upHandler = (e: MouseEvent) => {
    if (e.button === 0) {
      mp().setLeftMouseDown(false)
      onLeftMouseUp?.()
    } else if (e.button === 1) {
      mp().setMiddleMouseDown(false)
      onMiddleMouseUp?.()
    } else if (e.button === 2) {
      mp().setRightMouseDown(false)
      onRightMouseUp?.()
    }
  }

  window.addEventListener('mousedown', downHandler)
  window.addEventListener('mouseup', upHandler)

  return () => {
    window.removeEventListener('mousedown', downHandler)
    window.removeEventListener('mouseup', upHandler)
  }
}
