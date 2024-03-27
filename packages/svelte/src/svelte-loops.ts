import { onMount } from 'svelte'

import { FrameCallback, startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: FrameCallback) => {
  onMount(() => startAnimationFrame(callback))
}
