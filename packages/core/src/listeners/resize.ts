import { Browser, getBrowser } from '../stores/browserStore'

export type ResizePayload = { width: number; height: number }

export type ResizeListenerProps = { onResize?: (payload: ResizePayload) => void }

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export const mountResizeListener = ({ onResize }: ResizeListenerProps) => {
  const payload: ResizePayload = { width: 0, height: 0 }

  const handler = () => {
    const browser: Mutable<Browser> = getBrowser()

    const width = window.innerWidth
    const height = window.innerHeight

    browser.width = width
    browser.height = height
    payload.width = browser.width
    payload.height = browser.height

    onResize?.(payload)
  }

  handler()

  window.addEventListener('resize', handler)

  return () => window.removeEventListener('resize', handler)
}
