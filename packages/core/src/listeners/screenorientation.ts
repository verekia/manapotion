import { mp } from '../store'

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

  const handler = () => {
    const isLandscape = landscapeQuery.matches
    const isPortrait = portraitQuery.matches
    mp().setScreenOrientation({ isLandscape, isPortrait })
    onScreenOrientationChange?.({ isLandscape, isPortrait })
  }

  handler()

  landscapeQuery.addEventListener('change', handler)

  return () => landscapeQuery.removeEventListener('change', handler)
}
