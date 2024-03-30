import { manaPotionStore } from '../store'

export type PageVisibilityPayload = { isPageVisible: boolean }

export type PageVisibilityListenerProps = {
  onPageVisibilityChange?: (payload: PageVisibilityPayload) => void
}

export const mountPageVisibilityListener = ({
  onPageVisibilityChange,
}: PageVisibilityListenerProps) => {
  const handler = () => {
    const isPageVisible = !document.hidden
    manaPotionStore.setState(s => ({ ...s, browser: { ...s.browser, isPageVisible } }))
    onPageVisibilityChange?.({ isPageVisible })
  }

  handler()

  document.addEventListener('visibilitychange', handler)

  return () => document.removeEventListener('visibilitychange', handler)
}
