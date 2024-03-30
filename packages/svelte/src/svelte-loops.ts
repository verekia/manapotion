import { onMount } from 'svelte'

import { startAnimationFrame } from '@manapotion/core'

import type { FrameCallback } from '@manapotion/core'

export const useAnimationFrame = (callback: FrameCallback) => {
  onMount(() => startAnimationFrame(callback))
}
