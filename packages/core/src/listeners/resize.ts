import { Browser, mp } from '../store'

export type ResizePayload = { width: number; height: number }

export type ResizeListenerProps = { onResize?: (payload: ResizePayload) => void }

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountResizeListener = ({ onResize }: ResizeListenerProps) => {
  const payload: ResizePayload = { width: 0, height: 0 }

  const handler = () => {
    const browser: Mutable<Browser> = mp().browser

    const width = window.innerWidth
    const height = window.innerHeight

    browser.windowWidth = width
    browser.windowHeight = height

    payload.width = width
    payload.height = height

    onResize?.(payload)
  }

  handler()

  window.addEventListener('resize', handler)

  return () => window.removeEventListener('resize', handler)
}
