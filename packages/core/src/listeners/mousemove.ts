import { mp } from '../store'

let mouseMoveResetTimeout: ReturnType<typeof setTimeout> | null = null

export const handleMouseMove =
  ({
    onMove,
    mouseMoveResetDelay,
  }: {
    onMove?: (
      mouseX: number,
      mouseY: number,
      mouseMovementX: number,
      mouseMovementY: number,
    ) => void
    mouseMoveResetDelay: number
  }) =>
  (e: MouseEvent) => {
    const mouseX = e.clientX
    const mouseY = window.innerHeight - e.clientY
    const mouseMovementX = e.movementX
    const mouseMovementY = -e.movementY

    mp().mouseX = mouseX
    mp().mouseY = mouseY
    mp().mouseMovementX = mouseMovementX
    mp().mouseMovementY = mouseMovementY
    onMove?.(mouseX, mouseY, mouseMovementX, mouseMovementY)

    mouseMoveResetTimeout && clearTimeout(mouseMoveResetTimeout)

    if (mouseMoveResetDelay) {
      mouseMoveResetTimeout = setTimeout(() => {
        mp().mouseMovementX = 0
        mp().mouseMovementY = 0
        onMove?.(mouseX, mouseY, 0, 0)
      }, mouseMoveResetDelay)
    }
  }

export const mouseMoveCleanup = () => {
  mouseMoveResetTimeout && clearTimeout(mouseMoveResetTimeout)
}
