import { useEffect } from 'react'

import { mountBlurListener, mountFocusListener } from '@manapotion/core'

export type PageFocusListenerProps = {
  clearInputsOnBlur?: boolean
  onPageBlur?: () => void
  onPageFocus?: () => void
}

export const PageFocusListener = ({
  onPageBlur,
  onPageFocus,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  useEffect(
    () => mountBlurListener({ onPageBlur, clearInputsOnBlur }),
    [onPageBlur, clearInputsOnBlur],
  )

  useEffect(() => mountFocusListener(onPageFocus), [onPageFocus])

  return null
}
