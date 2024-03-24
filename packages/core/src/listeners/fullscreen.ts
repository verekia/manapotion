import { mp } from '../store'

export type FullscreenListenerProps = {
  onUpdate?: (isFullscreen: boolean) => void
}

export const mountFullscreenListener = ({ onUpdate }: FullscreenListenerProps) => {
  const handler = () => {
    const isFullscreen = Boolean(document.fullscreenElement)
    mp().setFullscreen(isFullscreen)
    onUpdate?.(isFullscreen)
  }

  handler()

  document.addEventListener('fullscreenchange', handler)

  return () => document.removeEventListener('fullscreenchange', handler)
}
