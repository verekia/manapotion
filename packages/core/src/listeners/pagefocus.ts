import { mp } from '../store'

export const mountBlurListener = ({
  onUpdate,
  clearInputsOnBlur = true,
}: {
  onUpdate?: (isPageFocused: boolean) => void
  clearInputsOnBlur?: boolean
}) => {
  const handler = () => {
    mp().setPageFocused(false)
    onUpdate?.(false)
    if (clearInputsOnBlur) {
      mp().clearInputs()
    }
  }

  window.addEventListener('blur', handler)

  return () => {
    window.removeEventListener('blur', handler)
  }
}

export const mountFocusListener = ({
  onUpdate,
}: {
  onUpdate?: (isPageFocused: boolean) => void
}) => {
  const handler = () => {
    mp().setPageFocused(true)
    onUpdate?.(true)
  }

  window.addEventListener('focus', handler)

  return () => {
    window.removeEventListener('focus', handler)
  }
}
