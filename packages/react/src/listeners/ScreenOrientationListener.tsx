import { useEffect } from 'react'

import { mountScreenOrientationListener, ScreenOrientationListenerProps } from '@manapotion/core'

export const ScreenOrientationListener = ({ onUpdate }: ScreenOrientationListenerProps) => {
  useEffect(() => mountScreenOrientationListener({ onUpdate }), [onUpdate])

  return null
}
