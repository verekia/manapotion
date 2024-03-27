import { mp } from '../store'

export type FullscreenChangePayload = { isFullscreen: boolean }

export type FullscreenListenerProps = {
  onFullscreenChange?: (payload: FullscreenChangePayload) => void
}

export const mountFullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  const handler = () => {
    const isFullscreen = Boolean(document.fullscreenElement)
    mp().setFullscreen(isFullscreen)
    onFullscreenChange?.({ isFullscreen })
  }

  handler()

  document.addEventListener('fullscreenchange', handler)

  return () => document.removeEventListener('fullscreenchange', handler)
}
