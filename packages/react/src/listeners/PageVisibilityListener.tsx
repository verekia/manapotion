import { useEffect } from 'react'

import { mountPageVisibilityListener } from '@manapotion/core'

import type { PageVisibilityListenerProps } from '@manapotion/core'

export const PageVisibilityListener = ({ onPageVisibilityChange }: PageVisibilityListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountPageVisibilityListener({ onPageVisibilityChange }), [])

  return null
}
