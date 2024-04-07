import { useEffect } from 'react'

import { addMainLoopEffect } from '@manapotion/core'

import type { MainLoopEffectCallback, MainLoopEffectOptions } from '@manapotion/core'

export const useMainLoop = (callback: MainLoopEffectCallback, options?: MainLoopEffectOptions) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => addMainLoopEffect(callback, options), [])
}
