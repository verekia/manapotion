import { mp } from '../store'

export const handleVisibilityChange =
  ({ onChange }: { onChange?: (isVisible: boolean) => void }) =>
  (_: Event) => {
    const isVisible = !document.hidden
    mp().setPageVisible(isVisible)
    onChange?.(isVisible)
  }
