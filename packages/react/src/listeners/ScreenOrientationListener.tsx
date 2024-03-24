import { useEffect } from 'react'

import { mountScreenOrientationListener, ScreenOrientationListenerProps } from '@manapotion/core'

export const ScreenOrientationListener = ({
  onScreenOrientationChange,
}: ScreenOrientationListenerProps) => {
  useEffect(() => mountScreenOrientationListener({ onScreenOrientationChange }), [])

  return null
}
