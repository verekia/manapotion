/**
 * Linearly interpolate between two numbers.
 * @param a - The start value.
 * @param b - The end value.
 * @param t - The interpolation factor.
 * @returns The interpolated value.
 * @example
 * ```ts
 * const a = 0
 * const b = 100
 * const t = 0.5
 * const result = lerp(a, b, t)
 * console.log(result) // 50
 * ```
 */
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

/**
 * Clamp a number between a minimum and maximum value.
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 * @example
 * ```ts
 * const min = 0
 * const max = 100
 * console.log(clamp(200, min, max)) // 100
 * console.log(clamp(-100, min, max)) // 0
 * console.log(clamp(50, min, max)) // 50
 * ```
 */
export const clamp = (value: number, min: number, max: number): number =>
  value < min ? min : value > max ? max : value

/**
 * Create a throttled version of a function.
 * @param callback - The function to throttle.
 * @param delay - The throttle delay in milliseconds.
 * @returns The throttled function.
 * @example
 * ```ts
 * const throttled = throttle(() => console.log('Hello, World!'), 1000)
 * window.addEventListener('resize', throttled)
 * ```
 */
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

/**
 * Create a debounced version of a function.
 * @param callback - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced function.
 * @example
 * ```ts
 * const debounced = debounce(() => console.log('Hello, World!'), 1000)
 * window.addEventListener('resize', debounced)
 * ```
 */
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

/**
 * Create a throttled version of a function that calls the function one last time after the delay has passed.
 * @param callback - The function to throttle and debounce.
 * @param delay - The throttle and debounce delay in milliseconds.
 * @returns The throttled and debounced function.
 * @example
 * ```ts
 * const throttledDebounced = throttleDebounce(() => console.log('Hello, World!'), 1000)
 * window.addEventListener('resize', throttledDebounced)
 * ```
 */
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
