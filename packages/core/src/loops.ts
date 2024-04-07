export type AnimationFrameCallback = ({
  delta,
  elapsed,
}: {
  delta: number
  elapsed: number
}) => void

export type AnimationFrameOptions = {
  throttle?: number
  stage?: number
}

const callbacks = new Map<number, Set<AnimationFrameCallback>>()
const callbackLastExecution = new WeakMap<AnimationFrameCallback, number>()
const state = { delta: 0, elapsed: 0 }
let previousTime = performance.now()
let running = false

const loop = (time: number) => {
  if (!running) return

  state.delta = time - previousTime
  state.elapsed += state.delta

  Array.from(callbacks.keys())
    .sort((a, b) => a - b)
    .forEach(stage => {
      callbacks.get(stage)?.forEach(callback => {
        try {
          callback(state)
        } catch (error) {
          console.error('Error in animation frame callback:', error)
        }
      })
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

  const stage = options?.stage || 0
  if (!callbacks.has(stage)) {
    callbacks.set(stage, new Set())
  }
  callbacks.get(stage)?.add(throttledCallback)

  if (!running) {
    running = true
    previousTime = performance.now() // Reset time to avoid large delta after pause
    requestAnimationFrame(loop)
  }

  return () => {
    callbacks.get(stage)?.delete(throttledCallback)
    if (callbacks.get(stage)?.size === 0) {
      callbacks.delete(stage)
    }
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
