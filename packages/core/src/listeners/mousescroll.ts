import { mp } from '../store'

let resetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseScrollListenerProps = {
  onScroll?: (deltaY: number) => void
  mouseScrollResetDelay?: number
}

export const mountMouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay,
}: MouseScrollListenerProps) => {
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
