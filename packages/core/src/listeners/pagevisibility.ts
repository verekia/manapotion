import { mp } from '../store'

export type PageVisibilityPayload = { isVisible: boolean }

export type PageVisibilityListenerProps = {
  onPageVisibilityChange?: (payload: PageVisibilityPayload) => void
}

export const mountPageVisibilityListener = ({
  onPageVisibilityChange,
}: PageVisibilityListenerProps) => {
  const handler = () => {
    const isVisible = !document.hidden
    mp().setPageVisible(isVisible)
    onPageVisibilityChange?.({ isVisible })
  }

  handler()

  document.addEventListener('visibilitychange', handler)

  return () => document.removeEventListener('visibilitychange', handler)
}
