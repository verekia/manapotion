export type MainLoopEffectCallback = (callback: {
  time: number
  delta: number
  elapsed: number
  callbackCount: number
}) => void

export type MainLoopEffectOptions = {
  throttle?: number
  stage?: number
}

type StageNumber = number

type State = {
  time: number
  delta: number
  elapsed: number
  callbackCount: number
}

const callbacks = new Map<StageNumber, Set<MainLoopEffectCallback>>()
const callbackLastExecutions = new WeakMap<MainLoopEffectCallback, number>()
const state: State = { time: 0, delta: 0, elapsed: 0, callbackCount: 0 }
let previousTime = performance.now()
let running = false
let animationFrameId: number | null = null

const mainLoop = (time: number) => {
  if (!running) return

  state.time = time

  let callbackCount = 0
  for (const callbacksSet of callbacks.values()) {
    callbackCount += callbacksSet.size
  }
  state.callbackCount = callbackCount

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
  animationFrameId = requestAnimationFrame(mainLoop)
}

export const addMainLoopEffect = (
  callback: MainLoopEffectCallback,
  options?: MainLoopEffectOptions,
) => {
  const throttledCallback = (state: State) => {
    const lastExecution = callbackLastExecutions.get(callback) || 0
    const throttleInterval = options?.throttle || 0

    if (state.time - lastExecution >= throttleInterval) {
      callbackLastExecutions.set(callback, state.time)
      state.delta = (state.time - previousTime) / 1000
      state.elapsed += state.delta
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
    animationFrameId = requestAnimationFrame(mainLoop)
  }

  return () => {
    callbacks.get(stage)?.delete(throttledCallback)
    if (callbacks.get(stage)?.size === 0) {
      callbacks.delete(stage)
    }
  }
}

export const pauseMainLoop = () => {
  running = false
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

export const resumeMainLoop = () => {
  if (!running && callbacks.size > 0) {
    running = true
    previousTime = performance.now() // Reset time to avoid large delta after pause
    animationFrameId = requestAnimationFrame(mainLoop)
  }
}
