import { onMount } from 'svelte'

import { startAnimationFrame } from '@manapotion/core'

import type { AnimationFrameCallback, AnimationFrameOptions } from '@manapotion/core'

export const useAnimationFrame = (
  callback: AnimationFrameCallback,
  options?: AnimationFrameOptions,
) => {
  onMount(() => startAnimationFrame(callback, options))
}
