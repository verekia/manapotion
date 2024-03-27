import { mp } from '../store'

let resetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseScrollPayload = { deltaY: number }

export type MouseScrollListenerProps = {
  onScroll?: (payload: MouseScrollPayload) => void
  mouseScrollResetDelay?: number
}

export const mountMouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay,
}: MouseScrollListenerProps) => {
  const payload: MouseScrollPayload = { deltaY: 0 }

  const handler = (e: WheelEvent) => {
    const deltaY = e.deltaY

    payload.deltaY = deltaY
    onScroll?.(payload)
    mp().mouseWheelDeltaY = deltaY

    resetTimeout && clearTimeout(resetTimeout)

    if (mouseScrollResetDelay) {
      resetTimeout = setTimeout(() => {
        payload.deltaY = 0
        onScroll?.(payload)
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
