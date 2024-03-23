import { mp } from './store'

export const handleMouseMove =
  // @ts-expect-error


    ({ onMouseMove, mouseMoveResetTimeout, mouseMoveResetDelay }) =>
    (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = window.innerHeight - e.clientY
      const mouseMovementX = e.movementX
      const mouseMovementY = -e.movementY

      mp().mouseX = mouseX
      mp().mouseY = mouseY
      mp().mouseMovementX = mouseMovementX
      mp().mouseMovementY = mouseMovementY
      onMouseMove?.(mouseX, mouseY, mouseMovementX, mouseMovementY)

      mouseMoveResetTimeout && clearTimeout(mouseMoveResetTimeout)

      if (mouseMoveResetDelay) {
        mouseMoveResetTimeout = setTimeout(() => {
          mp().mouseMovementX = 0
          mp().mouseMovementY = 0
          onMouseMove?.(mouseX, mouseY, 0, 0)
        }, mouseMoveResetDelay)
      }
    }

export const mouseMoveCleanup =
  // @ts-expect-error
  mouseMoveResetTimeout => mouseMoveResetTimeout && clearTimeout(mouseMoveResetTimeout)
