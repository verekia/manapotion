import { useEffect } from 'react'

import { mountPageVisibilityListener, PageVisibilityListenerProps } from '@manapotion/core'

export const PageVisibilityListener = ({ onPageVisibilityChange }: PageVisibilityListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountPageVisibilityListener({ onPageVisibilityChange }), [])

  return null
}
