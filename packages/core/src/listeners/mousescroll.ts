import { mp } from '../store'

let resetTimeout: ReturnType<typeof setTimeout> | null = null

export const mountMouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay,
}: {
  onScroll?: (deltaY: number) => void
  mouseScrollResetDelay?: number
}) => {
  const handler = (e: WheelEvent) => {
    const deltaY = e.deltaY

    onScroll?.(deltaY)
    mp().mouseWheelDeltaY = deltaY

    resetTimeout && clearTimeout(resetTimeout)

    if (mouseScrollResetDelay) {
      resetTimeout = setTimeout(() => {
        onScroll?.(0)
        mp().mouseWheelDeltaY = 0
      }, mouseScrollResetDelay)
    }
  }

  window.addEventListener('wheel', handler)

  return () => {
    resetTimeout && clearTimeout(resetTimeout)
    window.removeEventListener('wheel', handler)
  }
}
