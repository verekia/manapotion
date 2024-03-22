import { useEffect } from 'react'

import { addEffect, addAfterEffect, addTail, type GlobalRenderCallback } from '@react-three/fiber'

export const useFrameEffect = (callback: GlobalRenderCallback) => {
  useEffect(() => addEffect(callback), [callback])
}

export const useFrameAfterEffect = (callback: GlobalRenderCallback) => {
  useEffect(() => addAfterEffect(callback), [callback])
}

export const useFrameTail = (callback: GlobalRenderCallback) => {
  useEffect(() => addTail(callback), [callback])
}
