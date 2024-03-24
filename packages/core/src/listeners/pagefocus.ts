import { mp } from '../store'

export const mountBlurListener = ({
  onPageBlur,
  clearInputsOnBlur = true,
}: {
  onPageBlur?: () => void
  clearInputsOnBlur?: boolean
}) => {
  const handler = () => {
    mp().setPageFocused(false)
    onPageBlur?.()
    if (clearInputsOnBlur) {
      mp().clearInputs()
    }
  }

  window.addEventListener('blur', handler)

  return () => {
    window.removeEventListener('blur', handler)
  }
}

export const mountFocusListener = (onPageFocus?: () => void) => {
  const handler = () => {
    mp().setPageFocused(true)
    onPageFocus?.()
  }

  window.addEventListener('focus', handler)

  return () => {
    window.removeEventListener('focus', handler)
  }
}
