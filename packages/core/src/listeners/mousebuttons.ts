import { mouseStore } from '../stores/mouseStore'

export type LeftMouseButtonDownPayload = Record<string, never>
export type MiddleMouseButtonDownPayload = Record<string, never>
export type RightMouseButtonDownPayload = Record<string, never>
export type LeftMouseButtonUpPayload = Record<string, never>
export type MiddleMouseButtonUpPayload = Record<string, never>
export type RightMouseButtonUpPayload = Record<string, never>

export type MouseButtonsListenerProps = {
  onLeftMouseButtonDown?: (payload: LeftMouseButtonDownPayload) => void
  onMiddleMouseButtonDown?: (payload: MiddleMouseButtonDownPayload) => void
  onRightMouseButtonDown?: (payload: RightMouseButtonDownPayload) => void
  onLeftMouseButtonUp?: (payload: LeftMouseButtonUpPayload) => void
  onMiddleMouseButtonUp?: (payload: MiddleMouseButtonUpPayload) => void
  onRightMouseButtonUp?: (payload: RightMouseButtonUpPayload) => void
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountMouseButtonsListener = ({
  onLeftMouseButtonDown,
  onMiddleMouseButtonDown,
  onRightMouseButtonDown,
  onLeftMouseButtonUp,
  onMiddleMouseButtonUp,
  onRightMouseButtonUp,
}: MouseButtonsListenerProps) => {
  const emptyObject = {}

  const downHandler = (e: MouseEvent) => {
    const left = (e.buttons & 1) !== 0
    const middle = (e.buttons & 4) !== 0
    const right = (e.buttons & 2) !== 0

    mouseStore.setState(s => {
      const newMouse = structuredClone(s)
      const buttons: Mutable<(typeof s)['buttons']> = newMouse.buttons
      buttons.left = left
      buttons.middle = middle
      buttons.right = right
      return newMouse
    })

    if (e.button === 0) {
      onLeftMouseButtonDown?.(emptyObject)
    } else if (e.button === 1) {
      onMiddleMouseButtonDown?.(emptyObject)
    } else if (e.button === 2) {
      onRightMouseButtonDown?.(emptyObject)
    }
  }

  const upHandler = (e: MouseEvent) => {
    const left = (e.buttons & 1) !== 0
    const middle = (e.buttons & 4) !== 0
    const right = (e.buttons & 2) !== 0

    mouseStore.setState(s => {
      const newMouse = structuredClone(s)
      const buttons: Mutable<(typeof s)['buttons']> = newMouse.buttons
      buttons.left = left
      buttons.middle = middle
      buttons.right = right
      return newMouse
    })

    if (e.button === 0) {
      onLeftMouseButtonUp?.(emptyObject)
    } else if (e.button === 1) {
      onMiddleMouseButtonUp?.(emptyObject)
    } else if (e.button === 2) {
      onRightMouseButtonUp?.(emptyObject)
    }
  }

  window.addEventListener('mousedown', downHandler)
  window.addEventListener('mouseup', upHandler)

  return () => {
    window.removeEventListener('mousedown', downHandler)
    window.removeEventListener('mouseup', upHandler)
  }
}
