import { useEffect } from 'react'

import { mountPageVisibilityListener } from '@manapotion/core'

export type PageVisibilityListenerProps = {
  onUpdate?: (isVisible: boolean) => void
}

export const PageVisibilityListener = ({ onUpdate }: PageVisibilityListenerProps) => {
  useEffect(() => mountPageVisibilityListener({ onUpdate }), [onUpdate])

  return null
}
