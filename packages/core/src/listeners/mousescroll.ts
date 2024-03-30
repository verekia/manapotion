import { Mouse, mp } from '../store'

let resetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseScrollPayload = Mouse

export type MouseScrollListenerProps = {
  onScroll?: (payload: MouseScrollPayload) => void
  mouseScrollResetDelay?: number
}

export const mountMouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay,
}: MouseScrollListenerProps) => {
  const handler = (e: WheelEvent) => {
    const { mouse } = mp()

    mouse.wheel.y = e.deltaY
    onScroll?.(mouse)

    resetTimeout && clearTimeout(resetTimeout)

    if (mouseScrollResetDelay) {
      resetTimeout = setTimeout(() => {
        mouse.wheel.y = 0
        onScroll?.(mouse)
      }, mouseScrollResetDelay)
    }
  }

  window.addEventListener('wheel', handler)

  return () => {
    resetTimeout && clearTimeout(resetTimeout)
    window.removeEventListener('wheel', handler)
  }
}
