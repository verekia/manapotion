import { useEffect } from 'react'

import { FrameCallback, startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: FrameCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => startAnimationFrame(callback), [])
}
