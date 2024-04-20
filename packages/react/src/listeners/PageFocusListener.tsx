import { useEffect } from 'react'

import { mountPageFocusListener } from '@manapotion/core'

import type { PageFocusListenerProps } from '@manapotion/core'

export const PageFocusListener = ({ onPageFocusChange }: PageFocusListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountPageFocusListener({ onPageFocusChange }), [])

  return null
}
