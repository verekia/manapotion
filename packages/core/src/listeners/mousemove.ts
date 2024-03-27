import { mp } from '../store'

let movementResetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseMovePayload = {
  x: number
  y: number
  movementX: number
  movementY: number
}

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (payload: MouseMovePayload) => void
}

export const mountMouseMoveListener = ({
  onMouseMove,
  mouseMovementResetDelay,
}: MouseMoveListenerProps) => {
  const payload: MouseMovePayload = {
    x: 0,
    y: 0,
    movementX: 0,
    movementY: 0,
  }

  const handler = (e: MouseEvent) => {
    const mouseX = e.clientX
    const mouseY = window.innerHeight - e.clientY
    const mouseMovementX = e.movementX
    const mouseMovementY = -e.movementY

    mp().mouseX = mouseX
    mp().mouseY = mouseY
    mp().mouseMovementX = mouseMovementX
    mp().mouseMovementY = mouseMovementY

    payload.x = mouseX
    payload.y = mouseY
    payload.movementX = mouseMovementX
    payload.movementY = mouseMovementY

    onMouseMove?.(payload)

    movementResetTimeout && clearTimeout(movementResetTimeout)

    if (mouseMovementResetDelay) {
      movementResetTimeout = setTimeout(() => {
        mp().mouseMovementX = 0
        mp().mouseMovementY = 0
        payload.movementX = 0
        payload.movementY = 0
        onMouseMove?.(payload)
      }, mouseMovementResetDelay)
    }
  }

  window.addEventListener('mousemove', handler)

  return () => {
    movementResetTimeout && clearTimeout(movementResetTimeout)
    window.removeEventListener('mousemove', handler)
  }
}
