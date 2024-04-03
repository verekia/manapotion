import { browserStore } from '../stores/browserStore'

export type PageFocusChangePayload = { isPageFocused: boolean }

export type PageFocusListenerProps = {
  onPageFocusChange?: (payload: PageFocusChangePayload) => void
}

export const mountPageFocusListener = ({ onPageFocusChange }: PageFocusListenerProps) => {
  const handler = () => {
    const isPageFocused = document.hasFocus()
    browserStore.setState(s => ({ ...s, isPageFocused }))
    onPageFocusChange?.({ isPageFocused })
  }

  handler()

  window.addEventListener('focus', handler)
  window.addEventListener('blur', handler)

  return () => {
    window.removeEventListener('focus', handler)
    window.removeEventListener('blur', handler)
  }
}
