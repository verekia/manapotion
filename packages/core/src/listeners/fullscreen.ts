import { mp } from '../store'

export const mountFullscreenListener = ({
  onUpdate,
}: {
  onUpdate?: (isFullscreen: boolean) => void
}) => {
  const handler = () => {
    const isFullscreen = Boolean(document.fullscreenElement)
    mp().setFullscreen(isFullscreen)
    onUpdate?.(isFullscreen)
  }

  handler()

  document.addEventListener('fullscreenchange', handler)

  return () => document.removeEventListener('fullscreenchange', handler)
}
