import { getMouse, Mouse, MouseWheel } from '../stores/mouseStore'

let resetTimeout: ReturnType<typeof setTimeout> | null = null

export type MouseScrollPayload = Mouse

export type MouseScrollListenerProps = {
  onScroll?: (payload: MouseScrollPayload) => void
  mouseScrollResetDelay?: number
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountMouseScrollListener = ({
  onScroll,
  mouseScrollResetDelay,
}: MouseScrollListenerProps) => {
  const handler = (e: WheelEvent) => {
    const mouse = getMouse()
    const wheel: Mutable<MouseWheel> = mouse.wheel

    wheel.y = e.deltaY
    onScroll?.(mouse)

    resetTimeout && clearTimeout(resetTimeout)

    if (mouseScrollResetDelay) {
      resetTimeout = setTimeout(() => {
        wheel.y = 0
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
