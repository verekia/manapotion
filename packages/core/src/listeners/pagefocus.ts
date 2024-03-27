import { mp } from '../store'

export type PageFocusChangePayload = { isPageFocused: boolean }

export type PageFocusListenerProps = {
  clearInputsOnBlur?: boolean
  onPageFocusChange?: (payload: PageFocusChangePayload) => void
}

export const mountBlurListener = ({
  onPageFocusChange,
  clearInputsOnBlur = true,
}: PageFocusListenerProps) => {
  const handler = () => {
    mp().setPageFocused(false)
    onPageFocusChange?.({ isPageFocused: false })
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
    onPageFocusChange?.({ isPageFocused: true })
  }

  window.addEventListener('focus', handler)

  return () => {
    window.removeEventListener('focus', handler)
  }
}
