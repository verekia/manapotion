import { browserStore } from '../stores/browserStore'

export type FullscreenChangePayload = { isFullscreen: boolean }

export type FullscreenListenerProps = {
  onFullscreenChange?: (payload: FullscreenChangePayload) => void
}

export const mountFullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  const handler = () => {
    const isFullscreen = Boolean(document.fullscreenElement)
    browserStore.setState(s => ({ ...s, isFullscreen }))
    onFullscreenChange?.({ isFullscreen })
  }

  handler()

  document.addEventListener('fullscreenchange', handler)

  return () => document.removeEventListener('fullscreenchange', handler)
}
