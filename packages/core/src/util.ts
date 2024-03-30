export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

export const clamp = (value: number, min: number, max: number): number =>
  value < min ? min : value > max ? max : value

export const throttle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 100,
): ((...args: T) => void) => {
  if (delay <= 0) return callback

  let lastCall = 0

  return (...args: T) => {
    const now = performance.now()
    if (now - lastCall < delay) return
    lastCall = now
    callback(...args)
  }
}

export const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 100,
): ((...args: T) => void) => {
  if (delay <= 0) return callback

  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: T) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => callback(...args), delay)
  }
}

export const throttleDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 100,
): ((...args: T) => void) => {
  if (delay <= 0) return callback

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null
  let lastCall = 0

  return (...args: T) => {
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
