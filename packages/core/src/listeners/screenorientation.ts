import { mp } from '../store'

export const mountScreenOrientationListener = ({
  onUpdate,
}: {
  onUpdate?: ({ isLandscape, isPortrait }: { isLandscape: boolean; isPortrait: boolean }) => void
}) => {
  const landscapeQuery = window.matchMedia('(orientation: landscape)')
  const portraitQuery = window.matchMedia('(orientation: portrait)')

  const handler = () => {
    const isLandscape = landscapeQuery.matches
    const isPortrait = portraitQuery.matches
    mp().setScreenOrientation({ isLandscape, isPortrait })
    onUpdate?.({ isLandscape, isPortrait })
  }

  handler()

  landscapeQuery.addEventListener('change', handler)

  return () => landscapeQuery.removeEventListener('change', handler)
}
