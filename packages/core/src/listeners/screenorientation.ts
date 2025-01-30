import { browserStore } from '../stores/browserStore'

export type ScreenOrientationChangePayload = {
  isLandscape: boolean
  isPortrait: boolean
}

export type ScreenOrientationListenerProps = {
  onScreenOrientationChange?: (payload: ScreenOrientationChangePayload) => void
}

export const mountScreenOrientationListener = ({
  onScreenOrientationChange,
}: ScreenOrientationListenerProps) => {
  const landscapeQuery = window.matchMedia('(orientation: landscape)')
  const portraitQuery = window.matchMedia('(orientation: portrait)')

  const update = () => {
    const isLandscape = landscapeQuery.matches
    const isPortrait = portraitQuery.matches
    const payload: ScreenOrientationChangePayload = { isLandscape, isPortrait }
    browserStore.setState(s => ({ ...s, ...payload }))
    return payload
  }

  const handleChange = () => {
    const payload = update()
    onScreenOrientationChange?.(payload)
  }

  update()

  landscapeQuery.addEventListener('change', handleChange)

  return () => landscapeQuery.removeEventListener('change', handleChange)
}
