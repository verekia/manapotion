import { useEffect } from 'react'

import { mountScreenOrientationListener } from '@manapotion/core'

export type ScreenOrientationListenerProps = {
  onUpdate?: ({ isLandscape, isPortrait }: { isLandscape: boolean; isPortrait: boolean }) => void
}

export const ScreenOrientationListener = ({ onUpdate }: ScreenOrientationListenerProps) => {
  useEffect(() => mountScreenOrientationListener({ onUpdate }), [onUpdate])

  return null
}
