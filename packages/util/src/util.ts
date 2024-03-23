export const pi = Math.PI
export const sin = Math.sin
export const cos = Math.cos
export const abs = Math.abs
export const sqrt = Math.sqrt
export const pow = Math.pow
export const atan2 = Math.atan2
export const round = Math.round
export const floor = Math.floor
export const ceil = Math.ceil
export const max = Math.max
export const min = Math.min

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

export const clamp = (value: number, min: number, max: number): number =>
  value < min ? min : value > max ? max : value

export const throttle = (
  callback: (...args: any[]) => void,
  delay = 100,
): ((...args: any[]) => void) => {
  if (delay <= 0) return callback

  let lastCall = 0

  return (...args: any[]) => {
    const now = performance.now()
    if (now - lastCall < delay) return
    lastCall = now
    callback(...args)
  }
}

export const debounce = (
  callback: (...args: any[]) => void,
  delay = 100,
): ((...args: any[]) => void) => {
  if (delay <= 0) return callback

  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => callback(...args), delay)
  }
}

export const throttleDebounce = (
  callback: (...args: any[]) => void,
  delay = 100,
): ((...args: any[]) => void) => {
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
