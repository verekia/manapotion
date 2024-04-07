import { onMount } from 'svelte'

import { addMainLoopEffect } from '@manapotion/core'

import type { MainLoopEffectCallback, MainLoopEffectOptions } from '@manapotion/core'

export const useMainLoop = (callback: MainLoopEffectCallback, options?: MainLoopEffectOptions) => {
  onMount(() => addMainLoopEffect(callback, options))
}
