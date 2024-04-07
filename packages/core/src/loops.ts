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

const callbacks = new Set<AnimationFrameCallback>()
const callbackLastExecution = new WeakMap<AnimationFrameCallback, number>()
const state = { delta: 0, elapsed: 0 }
let previousTime = performance.now()
let running = false

const loop = (time: number) => {
  if (!running) return

  state.delta = time - previousTime
  state.elapsed += state.delta
  callbacks.forEach(callback => {
    try {
      callback(state)
    } catch (error) {
      console.error('Error in animation frame callback:', error)
    }
  })
  previousTime = time
  requestAnimationFrame(loop)
}

const subscribe = (callback: AnimationFrameCallback, options?: AnimationFrameOptions) => {
  const throttledCallback = (state: { delta: number; elapsed: number }) => {
    const now = performance.now()
    const lastExecution = callbackLastExecution.get(callback) || 0
    const throttleInterval = options?.throttle || 0

    if (now - lastExecution >= throttleInterval) {
      callbackLastExecution.set(callback, now)
      callback(state)
    }
  }

  callbacks.add(throttledCallback)

  if (!running) {
    running = true
    previousTime = performance.now() // Reset time to avoid large delta after pause
    requestAnimationFrame(loop)
  }

  return () => {
    callbacks.delete(throttledCallback)
  }
}

export const startAnimationFrame = subscribe

export const pauseAnimation = () => (running = false)

export const resumeAnimation = () => {
  if (!running && callbacks.size > 0) {
    running = true
    previousTime = performance.now() // Reset time to avoid large delta after pause
    requestAnimationFrame(loop)
  }
}
