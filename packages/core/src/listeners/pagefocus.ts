import { browserStore } from '../stores/browserStore'

export type PageFocusChangePayload = { isPageFocused: boolean }

export type PageFocusListenerProps = {
  onPageFocusChange?: (payload: PageFocusChangePayload) => void
}

export const mountBlurListener = ({ onPageFocusChange }: PageFocusListenerProps) => {
  const handler = () => {
    browserStore.setState(s => ({ ...s, isPageFocused: false }))
    onPageFocusChange?.({ isPageFocused: false })
  }

  window.addEventListener('blur', handler)

  return () => {
    window.removeEventListener('blur', handler)
  }
}

export const mountFocusListener = ({ onPageFocusChange }: PageFocusListenerProps) => {
  const handler = () => {
    browserStore.setState(s => ({ ...s, isPageFocused: true }))
    onPageFocusChange?.({ isPageFocused: true })
  }

  window.addEventListener('focus', handler)

  return () => {
    window.removeEventListener('focus', handler)
  }
}
