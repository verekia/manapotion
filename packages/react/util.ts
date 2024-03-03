export const throttleDebounce = (callback: (...args: any[]) => void, delay = 100) => {
  if (delay <= 0) return callback

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null
  let lastCall = 0

  return (...args: any[]) => {
    const now = performance.now()
    const throttleTimePassed = now - lastCall >= delay
    const callCallback = () => {
      if (debounceTimeout !== null) {
        clearTimeout(debounceTimeout)
        debounceTimeout = null
      }
      callback(...args)
      lastCall = performance.now()
    }

    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout)
    }

    if (throttleTimePassed) {
      callCallback()
    } else {
      debounceTimeout = setTimeout(callCallback, delay - (now - lastCall))
    }
  }
}
