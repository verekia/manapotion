import { Mouse, mp } from '../store'

let movementResetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseMovePayload = Mouse

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (payload: Mouse) => void
}

export const mountMouseMoveListener = ({
  onMouseMove,
  mouseMovementResetDelay,
}: MouseMoveListenerProps) => {
  const handler = (e: MouseEvent) => {
    const { mouse } = mp()

    mouse.position.x = e.clientX
    mouse.position.y = window.innerHeight - e.clientY
    mouse.movement.x = e.movementX
    mouse.movement.y = -e.movementY
    onMouseMove?.(mouse)

    movementResetTimeout && clearTimeout(movementResetTimeout)

    if (mouseMovementResetDelay) {
      movementResetTimeout = setTimeout(() => {
        mouse.movement.x = 0
        mouse.movement.y = 0
        onMouseMove?.(mouse)
      }, mouseMovementResetDelay)
    }
  }

  window.addEventListener('mousemove', handler)

  return () => {
    movementResetTimeout && clearTimeout(movementResetTimeout)
    window.removeEventListener('mousemove', handler)
  }
}
