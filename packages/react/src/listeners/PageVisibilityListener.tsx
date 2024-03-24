import { useEffect } from 'react'

import { mountPageVisibilityListener, PageVisibilityListenerProps } from '@manapotion/core'

export const PageVisibilityListener = ({ onPageVisibilityChange }: PageVisibilityListenerProps) => {
  useEffect(() => mountPageVisibilityListener({ onPageVisibilityChange }), [onPageVisibilityChange])

  return null
}
