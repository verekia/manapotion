import { useEffect } from 'react'

import { startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  useEffect(
    () => startAnimationFrame(callback),
    // By not including `callback` in the dependencies array, we ensure that the effect is
    // only run once, at the cost of not being able to update the callback function.
    [],
  )
}
