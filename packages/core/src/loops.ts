export type FrameCallback = ({ delta, elapsed }: { delta: number; elapsed: number }) => void

export const startAnimationFrame = (callback: FrameCallback) => {
  let request: number | undefined
  let previousTime = performance.now()
  const state = { delta: 0, elapsed: 0 }

  const animate = (time: number) => {
    state.delta = time - previousTime
    state.elapsed += state.delta
    callback(state)
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
