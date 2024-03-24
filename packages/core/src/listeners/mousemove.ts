import { mp } from '../store'

let movementResetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onMouseMove?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const mountMouseMoveListener = ({
  onMouseMove,
  mouseMovementResetDelay,
}: MouseMoveListenerProps) => {
  const handler = (e: MouseEvent) => {
    const mouseX = e.clientX
    const mouseY = window.innerHeight - e.clientY
    const mouseMovementX = e.movementX
    const mouseMovementY = -e.movementY

    mp().mouseX = mouseX
    mp().mouseY = mouseY
    mp().mouseMovementX = mouseMovementX
    mp().mouseMovementY = mouseMovementY
    onMouseMove?.(mouseX, mouseY, mouseMovementX, mouseMovementY)

    movementResetTimeout && clearTimeout(movementResetTimeout)

    if (mouseMovementResetDelay) {
      movementResetTimeout = setTimeout(() => {
        mp().mouseMovementX = 0
        mp().mouseMovementY = 0
        onMouseMove?.(mouseX, mouseY, 0, 0)
      }, mouseMovementResetDelay)
    }
  }

  window.addEventListener('mousemove', handler)

  return () => {
    movementResetTimeout && clearTimeout(movementResetTimeout)
    window.removeEventListener('mousemove', handler)
  }
}
