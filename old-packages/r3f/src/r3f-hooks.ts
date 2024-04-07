import { useEffect } from 'react'

import { addAfterEffect, addEffect, addTail } from '@react-three/fiber'
import throttle from 'lodash.throttle'

import type { GlobalRenderCallback } from '@react-three/fiber'

export const useFrameEffect = (callback: GlobalRenderCallback, options?: { throttle?: number }) => {
  useEffect(
    () => addEffect(options?.throttle ? throttle(callback, options?.throttle) : callback),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}

export const useFrameAfterEffect = (
  callback: GlobalRenderCallback,
  options?: { throttle?: number },
) => {
  useEffect(
    () => addAfterEffect(options?.throttle ? throttle(callback, options?.throttle) : callback),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}

export const useFrameTail = (callback: GlobalRenderCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => addTail(callback), [])
}
