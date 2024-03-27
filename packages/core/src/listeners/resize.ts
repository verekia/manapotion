import { mp } from '../store'

export type ResizePayload = {
  width: number
  height: number
  isLandscape: boolean
  isPortrait: boolean
}

export type ResizeListenerProps = { onResize?: (payload: ResizePayload) => void }

export const mountResizeListener = ({ onResize }: ResizeListenerProps) => {
  const payload: ResizePayload = {
    width: 0,
    height: 0,
    isPortrait: false,
    isLandscape: false,
  }

  const handler = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    mp().windowWidth = width
    mp().windowHeight = height
    const isPortrait = height >= width
    const isLandscape = width > height
    mp().isPortrait = isPortrait
    mp().isLandscape = isLandscape

    payload.width = width
    payload.height = height
    payload.isPortrait = isPortrait
    payload.isLandscape = isLandscape
    onResize?.(payload)
  }

  handler()

  window.addEventListener('resize', handler)

  return () => window.removeEventListener('resize', handler)
}
