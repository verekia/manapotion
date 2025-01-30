import { browserStore } from '../stores/browserStore'

export type PageFocusChangePayload = { isPageFocused: boolean }

export type PageFocusListenerProps = {
  onPageFocusChange?: (payload: PageFocusChangePayload) => void
}

export const mountPageFocusListener = ({ onPageFocusChange }: PageFocusListenerProps) => {
  const update = () => {
    const isPageFocused = document.hasFocus()
    const payload: PageFocusChangePayload = { isPageFocused }
    browserStore.setState(s => ({ ...s, ...payload }))
    return payload
  }

  const handleChange = () => {
    const payload = update()
    onPageFocusChange?.(payload)
  }

  update()

  window.addEventListener('focus', handleChange)
  window.addEventListener('blur', handleChange)

  return () => {
    window.removeEventListener('focus', handleChange)
    window.removeEventListener('blur', handleChange)
  }
}
