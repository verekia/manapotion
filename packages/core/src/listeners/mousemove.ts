import { getMouse, Mouse, MouseMovement, MousePosition } from '../stores/mouseStore'

let movementResetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseMovePayload = Mouse

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (payload: Mouse) => void
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountMouseMoveListener = ({
  onMouseMove,
  mouseMovementResetDelay,
}: MouseMoveListenerProps) => {
  const handler = (e: MouseEvent) => {
    const mouse = getMouse()
    const position: Mutable<MousePosition> = mouse.position
    const movement: Mutable<MouseMovement> = mouse.movement

    position.x = e.clientX
    position.y = window.innerHeight - e.clientY
    movement.x = e.movementX
    movement.y = -e.movementY
    onMouseMove?.(mouse)

    movementResetTimeout && clearTimeout(movementResetTimeout)

    if (mouseMovementResetDelay) {
      movementResetTimeout = setTimeout(() => {
        movement.x = 0
        movement.y = 0
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
