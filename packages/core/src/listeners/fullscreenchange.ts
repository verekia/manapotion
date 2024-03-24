import { mp } from '../store'

export const mountFullscreenListener = (onChange?: (isFullscreen: boolean) => void) => {
  const handler = () => {
    const isFullscreen = Boolean(document.fullscreenElement)
    mp().setFullscreen(isFullscreen)
    onChange?.(isFullscreen)
  }

  document.addEventListener('fullscreenchange', handler)

  return () => document.removeEventListener('fullscreenchange', handler)
}
