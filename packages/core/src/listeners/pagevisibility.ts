import { browserStore } from '../stores/browserStore'

export type PageVisibilityPayload = { isPageVisible: boolean }

export type PageVisibilityListenerProps = {
  onPageVisibilityChange?: (payload: PageVisibilityPayload) => void
}

export const mountPageVisibilityListener = ({
  onPageVisibilityChange,
}: PageVisibilityListenerProps) => {
  const update = () => {
    const isPageVisible = !document.hidden
    const payload: PageVisibilityPayload = { isPageVisible }
    browserStore.setState(s => ({ ...s, ...payload }))
    return payload
  }

  const handleChange = () => {
    const payload = update()
    onPageVisibilityChange?.(payload)
  }

  update()

  document.addEventListener('visibilitychange', handleChange)

  return () => document.removeEventListener('visibilitychange', handleChange)
}
