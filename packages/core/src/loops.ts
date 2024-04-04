import throttle from 'lodash.throttle'

export type AnimationFrameCallback = ({
  delta,
  elapsed,
}: {
  delta: number
  elapsed: number
}) => void
export type AnimationFrameOptions = {
  throttle?: number
}

export const startAnimationFrame = (
  callback: AnimationFrameCallback,
  options?: AnimationFrameOptions,
) => {
  let request: number | undefined
  let previousTime = performance.now()
  const state = { delta: 0, elapsed: 0 }
  let throttledCallback = callback

  if (options?.throttle) {
    throttledCallback = throttle(callback, options?.throttle)
  }

  const animate = (time: number) => {
    state.delta = time - previousTime
    state.elapsed += state.delta
    throttledCallback(state)
    previousTime = time
    request = requestAnimationFrame(animate)
  }

  request = requestAnimationFrame(animate)

  return () => {
    if (request !== undefined) {
      cancelAnimationFrame(request)
    }
  }
}
