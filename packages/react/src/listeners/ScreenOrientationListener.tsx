import { useEffect } from 'react'

import { mountScreenOrientationListener } from '@manapotion/core'

import type { ScreenOrientationListenerProps } from '@manapotion/core'

export const ScreenOrientationListener = ({
  onScreenOrientationChange,
}: ScreenOrientationListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountScreenOrientationListener({ onScreenOrientationChange }), [])

  return null
}
