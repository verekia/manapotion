import { mp } from '../store'

export type PageFocusListenerProps = {
  clearInputsOnBlur?: boolean
  onPageFocusChange?: (isPageFocused: boolean) => void
}

export const mountBlurListener = ({
  onPageFocusChange,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  const handler = () => {
    mp().setPageFocused(false)
    onPageFocusChange?.(false)
    if (clearInputsOnBlur) {
      mp().clearInputs()
    }
  }

  window.addEventListener('blur', handler)

  return () => {
    window.removeEventListener('blur', handler)
  }
}

export const mountFocusListener = ({ onPageFocusChange }: PageFocusListenerProps) => {
  const handler = () => {
    mp().setPageFocused(true)
    onPageFocusChange?.(true)
  }

  window.addEventListener('focus', handler)

  return () => {
    window.removeEventListener('focus', handler)
  }
}
