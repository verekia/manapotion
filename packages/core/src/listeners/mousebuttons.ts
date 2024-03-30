import { Mouse, mp } from '../store'

export type LeftMouseButtonDownPayload = Mouse
export type MiddleMouseButtonDownPayload = Mouse
export type RightMouseButtonDownPayload = Mouse
export type LeftMouseButtonUpPayload = Mouse
export type MiddleMouseButtonUpPayload = Mouse
export type RightMouseButtonUpPayload = Mouse

export type MouseButtonsListenerProps = {
  onLeftMouseButtonDown?: (payload: LeftMouseButtonDownPayload) => void
  onMiddleMouseButtonDown?: (payload: MiddleMouseButtonDownPayload) => void
  onRightMouseButtonDown?: (payload: RightMouseButtonDownPayload) => void
  onLeftMouseButtonUp?: (payload: LeftMouseButtonUpPayload) => void
  onMiddleMouseButtonUp?: (payload: MiddleMouseButtonUpPayload) => void
  onRightMouseButtonUp?: (payload: RightMouseButtonUpPayload) => void
}

export const mountMouseButtonsListener = ({
  onLeftMouseButtonDown,
  onMiddleMouseButtonDown,
  onRightMouseButtonDown,
  onLeftMouseButtonUp,
  onMiddleMouseButtonUp,
  onRightMouseButtonUp,
}: MouseButtonsListenerProps) => {
  const downHandler = (e: MouseEvent) => {
    const { mouse, setMouseButtons } = mp()
    if (e.button === 0) {
      setMouseButtons({ ...mouse.buttons, left: true })
      onLeftMouseButtonDown?.(mouse)
    } else if (e.button === 1) {
      setMouseButtons({ ...mouse.buttons, middle: true })
      onMiddleMouseButtonDown?.(mouse)
    } else if (e.button === 2) {
      setMouseButtons({ ...mouse.buttons, right: true })
      onRightMouseButtonDown?.(mouse)
    }
  }

  const upHandler = (e: MouseEvent) => {
    const { mouse, setMouseButtons } = mp()
    if (e.button === 0) {
      setMouseButtons({ ...mouse.buttons, left: false })
      onLeftMouseButtonUp?.(mouse)
    } else if (e.button === 1) {
      setMouseButtons({ ...mouse.buttons, middle: false })
      onMiddleMouseButtonUp?.(mouse)
    } else if (e.button === 2) {
      setMouseButtons({ ...mouse.buttons, right: false })
      onRightMouseButtonUp?.(mouse)
    }
  }

  window.addEventListener('mousedown', downHandler)
  window.addEventListener('mouseup', upHandler)

  return () => {
    window.removeEventListener('mousedown', downHandler)
    window.removeEventListener('mouseup', upHandler)
  }
}
