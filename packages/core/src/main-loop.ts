export type MainLoopState = {
  time: number
  delta: number
  timeRunning: number
  callbackCount: number
}

export type MainLoopEffectCallback = (callback: MainLoopState) => void

export type MainLoopEffectOptions = {
  throttle?: number
  stage?: number
}

type StageNumber = number

const callbacks = new Map<StageNumber, Set<MainLoopEffectCallback>>()
const callbackLastExecutions = new Map<MainLoopEffectCallback, number>()
const state: MainLoopState = {
  time: 0,
  delta: 0,
  timeRunning: 0,
  callbackCount: 0,
}
let running = false
let previousTime = 0
let animationFrameId: number | null = null

const mainLoop = (time: number) => {
  if (!running) return

  state.time = time
  state.timeRunning += state.time - previousTime

  let callbackCount = 0
  for (const callbacksSet of callbacks.values()) {
    callbackCount += callbacksSet.size
  }
  state.callbackCount = callbackCount

  // TODO: Use for loops instead, sort in addMainLoopEffect instead
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

  previousTime = state.time
  animationFrameId = requestAnimationFrame(mainLoop)
}

export const addMainLoopEffect = (
  callback: MainLoopEffectCallback,
  options?: MainLoopEffectOptions,
) => {
  const throttledCallback = (state: MainLoopState) => {
    const lastExecution = callbackLastExecutions.get(callback) || 0
    const throttleInterval = options?.throttle || 0

    if (throttleInterval === 0) {
      // No throttling, execute every frame
      callbackLastExecutions.set(callback, state.time)

      state.delta = (state.time - previousTime) / 1000
      callback(state)
    } else {
      // Calculate the number of intervals passed
      const intervalsPassed = Math.floor((state.time - lastExecution) / throttleInterval)

      if (intervalsPassed >= 1) {
        // Update last execution time to the most recent interval
        const newLastExecution = lastExecution + intervalsPassed * throttleInterval
        callbackLastExecutions.set(callback, newLastExecution)

        state.delta = (newLastExecution - lastExecution) / 1000
        callback(state)
      }
    }
  }

  const stage = options?.stage || 0
  if (!callbacks.has(stage)) {
    callbacks.set(stage, new Set())
  }
  callbacks.get(stage)?.add(throttledCallback)

  if (!running) {
    running = true
    // Reset time to avoid large delta after pause
    animationFrameId = requestAnimationFrame(time => {
      previousTime = Math.round(time) // To avoid microseconds that we might get at the initial call
      callbackLastExecutions.forEach((_, callback) => callbackLastExecutions.set(callback, time))
      mainLoop(time)
    })
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
    // Reset time to avoid large delta after pause
    animationFrameId = requestAnimationFrame(time => {
      previousTime = time
      callbackLastExecutions.forEach((_, callback) => callbackLastExecutions.set(callback, time))
      mainLoop(time)
    })
  }
}
