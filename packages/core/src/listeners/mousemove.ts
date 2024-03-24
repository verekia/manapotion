import { mp } from '../store'

let mouseMovementResetTimeout: ReturnType<typeof setTimeout> | null = null

export const mountMouseMoveListener = ({
  onUpdate,
  mouseMovementResetDelay,
}: {
  onUpdate?: (
    mouseX: number,
    mouseY: number,
    mouseMovementX: number,
    mouseMovementY: number,
  ) => void
  mouseMovementResetDelay: number
}) => {
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

    mouseMovementResetTimeout && clearTimeout(mouseMovementResetTimeout)

    if (mouseMovementResetDelay) {
      mouseMovementResetTimeout = setTimeout(() => {
        mp().mouseMovementX = 0
        mp().mouseMovementY = 0
        onUpdate?.(mouseX, mouseY, 0, 0)
      }, mouseMovementResetDelay)
    }
  }

  window.addEventListener('mousemove', handler)

  return () => {
    mouseMovementResetTimeout && clearTimeout(mouseMovementResetTimeout)
    window.removeEventListener('mousemove', handler)
  }
}
