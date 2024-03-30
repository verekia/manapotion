import { useEffect } from 'react'

import { mountBlurListener, mountFocusListener, PageFocusListenerProps } from '@manapotion/core'

export const PageFocusListener = ({
  onPageFocusChange,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountBlurListener({ onPageFocusChange, clearInputsOnBlur }), [clearInputsOnBlur])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountFocusListener({ onPageFocusChange }), [])

  return null
}
