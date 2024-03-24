import { useEffect } from 'react'

import { mountBlurListener, mountFocusListener, PageFocusListenerProps } from '@manapotion/core'

export const PageFocusListener = ({
  onPageFocusChange,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  useEffect(() => mountBlurListener({ onPageFocusChange, clearInputsOnBlur }), [clearInputsOnBlur])
  useEffect(() => mountFocusListener({ onPageFocusChange }), [])

  return null
}
