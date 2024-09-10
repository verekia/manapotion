import { useEffect, useRef } from 'react'

import { addMainLoopEffect } from '@manapotion/core'

import type { MainLoopEffectCallback, MainLoopEffectOptions } from '@manapotion/core'

import { useMutableCallback } from './util'

export const useMainLoop = (callback: MainLoopEffectCallback, options?: MainLoopEffectOptions) => {
  const mutableCallbackRef = useMutableCallback(callback)
  const stableOptions = useRef(options)
  useEffect(
    () => addMainLoopEffect(args => mutableCallbackRef.current(args), stableOptions.current),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}
