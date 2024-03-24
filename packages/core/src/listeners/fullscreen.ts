import { mp } from '../store'

export type FullscreenListenerProps = {
  onFullscreenChange?: (isFullscreen: boolean) => void
}

export const mountFullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  const handler = () => {
    const isFullscreen = Boolean(document.fullscreenElement)
    mp().setFullscreen(isFullscreen)
    onFullscreenChange?.(isFullscreen)
  }

  handler()

  document.addEventListener('fullscreenchange', handler)

  return () => document.removeEventListener('fullscreenchange', handler)
}
