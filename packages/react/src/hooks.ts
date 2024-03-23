import { useEffect, useRef } from 'react'

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number | undefined>()
  const previousTimeRef = useRef<number | undefined>()

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current!)
  }, [])
}
