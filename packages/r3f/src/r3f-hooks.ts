import { useEffect } from 'react'

import { addAfterEffect, addEffect, addTail } from '@react-three/fiber'

import type { GlobalRenderCallback } from '@react-three/fiber'

export const useFrameEffect = (callback: GlobalRenderCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => addEffect(callback), [])
}

export const useFrameAfterEffect = (callback: GlobalRenderCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => addAfterEffect(callback), [])
}

export const useFrameTail = (callback: GlobalRenderCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => addTail(callback), [])
}
