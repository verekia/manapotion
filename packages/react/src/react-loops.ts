import { useEffect } from 'react'

import {
  AnimationFrameCallback,
  AnimationFrameOptions,
  startAnimationFrame,
} from '@manapotion/core'

export const useAnimationFrame = (
  callback: AnimationFrameCallback,
  options?: AnimationFrameOptions,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => startAnimationFrame(callback, options), [])
}
