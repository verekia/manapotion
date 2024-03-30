import { useEffect } from 'react'

import { mountBlurListener, mountFocusListener, PageFocusListenerProps } from '@manapotion/core'

export const PageFocusListener = ({ onPageFocusChange }: PageFocusListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountBlurListener({ onPageFocusChange }), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountFocusListener({ onPageFocusChange }), [])

  return null
}
