import { mp } from '../store'

export const mountPageVisibilityListener = ({
  onUpdate,
}: {
  onUpdate?: (isVisible: boolean) => void
}) => {
  const handler = () => {
    const isVisible = !document.hidden
    mp().setPageVisible(isVisible)
    onUpdate?.(isVisible)
  }

  handler()

  document.addEventListener('visibilitychange', handler)

  return () => document.removeEventListener('visibilitychange', handler)
}
