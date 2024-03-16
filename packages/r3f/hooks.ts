import { useEffect } from 'react'

import { addEffect, addAfterEffect, addTail, type GlobalRenderCallback } from '@react-three/fiber'

export const useFrameBefore = (callback: GlobalRenderCallback) => {
  useEffect(() => addEffect(callback), [callback])
}

export const useFrameAfter = (callback: GlobalRenderCallback) => {
  useEffect(() => addAfterEffect(callback), [callback])
}

export const useFrameStop = (callback: GlobalRenderCallback) => {
  useEffect(() => addTail(callback), [callback])
}
