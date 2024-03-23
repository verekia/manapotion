import { mp } from '../store'

export const handleBlur =
  ({
    onPageBlur,
    clearInputsOnBlur = true,
  }: {
    onPageBlur?: () => void
    clearInputsOnBlur?: boolean
  }) =>
  (_: Event) => {
    mp().setPageFocused(false)
    onPageBlur?.()
    if (clearInputsOnBlur) {
      mp().clearInputs()
    }
  }

export const handleFocus =
  ({ onPageFocus }: { onPageFocus?: () => void }) =>
  (_: Event) => {
    mp().setPageFocused(true)
    onPageFocus?.()
  }
