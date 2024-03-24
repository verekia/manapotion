import { useEffect } from 'react'

import { mountBlurListener, mountFocusListener } from '@manapotion/core'

export type PageFocusListenerProps = {
  clearInputsOnBlur?: boolean
  onUpdate?: (isPageFocused: boolean) => void
}

export const PageFocusListener = ({
  onUpdate,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  useEffect(() => mountBlurListener({ onUpdate, clearInputsOnBlur }), [onUpdate, clearInputsOnBlur])
  useEffect(() => mountFocusListener({ onUpdate }), [onUpdate])

  return null
}
