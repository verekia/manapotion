export const startAnimationFrame = (callback: (deltaTime: number) => void) => {
  let request: number | undefined
  let previousTime = performance.now()

  const animate = (time: number) => {
    const deltaTime = time - previousTime
    callback(deltaTime)
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
