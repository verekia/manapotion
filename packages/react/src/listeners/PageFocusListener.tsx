import { useEffect } from 'react'

import { handleBlur, handleFocus } from '@manapotion/core'

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
  useEffect(() => {
    const blurHandler = handleBlur({ onPageBlur, clearInputsOnBlur })
    const focusHandler = handleFocus({ onPageFocus })

    window.addEventListener('blur', blurHandler)
    window.addEventListener('focus', focusHandler)

    return () => {
      window.removeEventListener('blur', blurHandler)
      window.removeEventListener('focus', focusHandler)
    }
  }, [onPageFocus, onPageBlur, clearInputsOnBlur])

  return null
}
