import { browserStore } from '../stores/browserStore'

export type FullscreenChangePayload = { isFullscreen: boolean }

export type FullscreenListenerProps = {
  onFullscreenChange?: (payload: FullscreenChangePayload) => void
}

export const mountFullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  const update = () => {
    const isFullscreen = Boolean(document.fullscreenElement)
    const payload: FullscreenChangePayload = { isFullscreen }
    browserStore.setState(s => ({ ...s, ...payload }))
    return payload
  }

  const handleChange = () => {
    const payload = update()
    onFullscreenChange?.(payload)
  }

  update()

  document.addEventListener('fullscreenchange', handleChange)

  return () => document.removeEventListener('fullscreenchange', handleChange)
}
