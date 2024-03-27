import { mp } from '../store'

export type LeftMouseDownPayload = {}
export type MiddleMouseDownPayload = {}
export type RightMouseDownPayload = {}
export type LeftMouseUpPayload = {}
export type MiddleMouseUpPayload = {}
export type RightMouseUpPayload = {}

export type MouseButtonsListenerProps = {
  onLeftMouseDown?: (payload: LeftMouseDownPayload) => void
  onMiddleMouseDown?: (payload: MiddleMouseDownPayload) => void
  onRightMouseDown?: (payload: RightMouseDownPayload) => void
  onLeftMouseUp?: (payload: LeftMouseUpPayload) => void
  onMiddleMouseUp?: (payload: MiddleMouseUpPayload) => void
  onRightMouseUp?: (payload: RightMouseUpPayload) => void
}

export const mountMouseButtonsListener = ({
  onLeftMouseDown,
  onMiddleMouseDown,
  onRightMouseDown,
  onLeftMouseUp,
  onMiddleMouseUp,
  onRightMouseUp,
}: MouseButtonsListenerProps) => {
  const emptyObject = {}

  const downHandler = (e: MouseEvent) => {
    if (e.button === 0) {
      mp().setLeftMouseDown(true)
      onLeftMouseDown?.(emptyObject)
    } else if (e.button === 1) {
      mp().setMiddleMouseDown(true)
      onMiddleMouseDown?.(emptyObject)
    } else if (e.button === 2) {
      mp().setRightMouseDown(true)
      onRightMouseDown?.(emptyObject)
    }
  }

  const upHandler = (e: MouseEvent) => {
    if (e.button === 0) {
      mp().setLeftMouseDown(false)
      onLeftMouseUp?.(emptyObject)
    } else if (e.button === 1) {
      mp().setMiddleMouseDown(false)
      onMiddleMouseUp?.(emptyObject)
    } else if (e.button === 2) {
      mp().setRightMouseDown(false)
      onRightMouseUp?.(emptyObject)
    }
  }

  window.addEventListener('mousedown', downHandler)
  window.addEventListener('mouseup', upHandler)

  return () => {
    window.removeEventListener('mousedown', downHandler)
    window.removeEventListener('mouseup', upHandler)
  }
}
