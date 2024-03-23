import { mp } from '../store'

export const handleFullscreenChange =
  ({ onChange }: { onChange?: (isFullscreen: boolean) => void }) =>
  (_: Event) => {
    const isFullscreen = Boolean(document.fullscreenElement)
    mp().setFullscreen(isFullscreen)
    onChange?.(isFullscreen)
  }
