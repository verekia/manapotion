import { useEffect } from 'react'

import { mountBlurListener, mountFocusListener, PageFocusListenerProps } from '@manapotion/core'

export const PageFocusListener = ({
  onUpdate,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  useEffect(() => mountBlurListener({ onUpdate, clearInputsOnBlur }), [onUpdate, clearInputsOnBlur])
  useEffect(() => mountFocusListener({ onUpdate }), [onUpdate])

  return null
}
