import { getMouse, MouseWheel } from '../stores/mouseStore'

let resetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseScrollPayload = { y: number }

export type MouseScrollListenerProps = {
  onScroll?: (payload: MouseScrollPayload) => void
  mouseScrollResetDelay?: number
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountMouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay = 100,
}: MouseScrollListenerProps) => {
  const payload = { y: 0 }

  const handler = (e: WheelEvent) => {
    const mouse = getMouse()
    const wheel: Mutable<MouseWheel> = mouse.wheel

    wheel.y = e.deltaY
    payload.y = wheel.y
    onScroll?.(payload)

    resetTimeout && clearTimeout(resetTimeout)

    if (mouseScrollResetDelay) {
      resetTimeout = setTimeout(() => {
        wheel.y = 0
        payload.y = wheel.y
        onScroll?.(payload)
      }, mouseScrollResetDelay)
    }
  }

  window.addEventListener('wheel', handler)

  return () => {
    resetTimeout && clearTimeout(resetTimeout)
    window.removeEventListener('wheel', handler)
  }
}
