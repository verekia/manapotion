import type { MouseMovement, MousePosition } from '../stores/mouseStore'

import { getMouse } from '../stores/mouseStore'

let movementResetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseMovePayload = {
  position: { x: number; y: number }
  movement: { x: number; y: number }
}

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (payload: MouseMovePayload) => void
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountMouseMoveListener = ({
  onMouseMove,
  mouseMovementResetDelay = 30,
}: MouseMoveListenerProps) => {
  const payload = { position: { x: 0, y: 0 }, movement: { x: 0, y: 0 } }

  const handler = (e: MouseEvent) => {
    const mouse = getMouse()
    const position: Mutable<MousePosition> = mouse.position
    const movement: Mutable<MouseMovement> = mouse.movement

    position.x = e.clientX
    position.y = window.innerHeight - e.clientY
    movement.x = e.movementX
    movement.y = -e.movementY

    payload.position.x = position.x
    payload.position.y = position.y
    payload.movement.x = movement.x
    payload.movement.y = movement.y
    onMouseMove?.(payload)

    movementResetTimeout && clearTimeout(movementResetTimeout)

    if (mouseMovementResetDelay) {
      movementResetTimeout = setTimeout(() => {
        movement.x = 0
        movement.y = 0
        payload.movement.x = movement.x
        payload.movement.y = movement.y
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
