import { useEffect } from 'react'

import { addAfterEffect, addEffect, addTail } from '@react-three/fiber'

import type { GlobalRenderCallback } from '@react-three/fiber'

export const useFrameEffect = (callback: GlobalRenderCallback) => {
  useEffect(() => addEffect(callback), [])
}

export const useFrameAfterEffect = (callback: GlobalRenderCallback) => {
  useEffect(() => addAfterEffect(callback), [])
}

export const useFrameTail = (callback: GlobalRenderCallback) => {
  useEffect(() => addTail(callback), [])
}
