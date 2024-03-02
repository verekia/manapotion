export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t
export const clamp = (value: number, limit: number) => Math.max(Math.min(value, limit), -limit)
export const pi = Math.PI

export const throttle = (callback: (...args: any[]) => void, delay = 100) => {
  let lastCall = 0

  return (...args: any[]) => {
    const now = performance.now()
    if (now - lastCall < delay) return
    lastCall = now
    callback(...args)
  }
}

export const debounce = (callback: (...args: any[]) => void, delay = 100) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => callback(...args), delay)
  }
}

export const throttleDebounce = (callback: (...args: any[]) => void, delay = 100) => {
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null
  let lastCall = 0

  return (...args: any[]) => {
    const now = performance.now()
    if (now - lastCall >= delay) {
      if (debounceTimeout !== null) {
        clearTimeout(debounceTimeout)
        debounceTimeout = null
      }
      callback(...args)
      lastCall = now
    } else if (debounceTimeout === null) {
      debounceTimeout = setTimeout(
        () => {
          callback(...args)
          lastCall = performance.now()
        },
        delay - (now - lastCall)
      )
    }
  }
}
