import { mp } from '../store'

let movementResetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseMoveListenerProps = {
  mouseMovementResetDelay?: number
  onUpdate?: (x: number, y: number, movementX: number, movementY: number) => void
}

export const mountMouseMoveListener = ({
  onUpdate,
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
    onUpdate?.(mouseX, mouseY, mouseMovementX, mouseMovementY)

    movementResetTimeout && clearTimeout(movementResetTimeout)

    if (mouseMovementResetDelay) {
      movementResetTimeout = setTimeout(() => {
        mp().mouseMovementX = 0
        mp().mouseMovementY = 0
        onUpdate?.(mouseX, mouseY, 0, 0)
      }, mouseMovementResetDelay)
    }
  }

  window.addEventListener('mousemove', handler)

  return () => {
    movementResetTimeout && clearTimeout(movementResetTimeout)
    window.removeEventListener('mousemove', handler)
  }
}
