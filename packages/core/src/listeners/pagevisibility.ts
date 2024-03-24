import { mp } from '../store'

export type PageVisibilityListenerProps = {
  onPageVisibilityChange?: (isVisible: boolean) => void
}

export const mountPageVisibilityListener = ({
  onPageVisibilityChange,
}: PageVisibilityListenerProps) => {
  const handler = () => {
    const isVisible = !document.hidden
    mp().setPageVisible(isVisible)
    onPageVisibilityChange?.(isVisible)
  }

  handler()

  document.addEventListener('visibilitychange', handler)

  return () => document.removeEventListener('visibilitychange', handler)
}
