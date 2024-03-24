import { mp } from '../store'

export type PageVisibilityListenerProps = {
  onUpdate?: (isVisible: boolean) => void
}

export const mountPageVisibilityListener = ({ onUpdate }: PageVisibilityListenerProps) => {
  const handler = () => {
    const isVisible = !document.hidden
    mp().setPageVisible(isVisible)
    onUpdate?.(isVisible)
  }

  handler()

  document.addEventListener('visibilitychange', handler)

  return () => document.removeEventListener('visibilitychange', handler)
}
