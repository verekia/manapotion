import { browserStore } from '../stores/browserStore'

export type PageVisibilityPayload = { isPageVisible: boolean }

export type PageVisibilityListenerProps = {
  onPageVisibilityChange?: (payload: PageVisibilityPayload) => void
}

export const mountPageVisibilityListener = ({
  onPageVisibilityChange,
}: PageVisibilityListenerProps) => {
  const handler = () => {
    const isPageVisible = !document.hidden
    browserStore.setState(s => ({ ...s, isPageVisible }))
    onPageVisibilityChange?.({ isPageVisible })
  }

  handler()

  document.addEventListener('visibilitychange', handler)

  return () => document.removeEventListener('visibilitychange', handler)
}
