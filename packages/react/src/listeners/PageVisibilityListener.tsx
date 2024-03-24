import { useEffect } from 'react'

import { mountPageVisibilityListener, PageVisibilityListenerProps } from '@manapotion/core'

export const PageVisibilityListener = ({ onUpdate }: PageVisibilityListenerProps) => {
  useEffect(() => mountPageVisibilityListener({ onUpdate }), [onUpdate])

  return null
}
