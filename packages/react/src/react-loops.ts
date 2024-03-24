import { useEffect } from 'react'

import { FrameCallback, startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: FrameCallback) => {
  useEffect(() => startAnimationFrame(callback), [])
}
