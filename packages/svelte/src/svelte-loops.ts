import { onDestroy, onMount } from 'svelte'

import { FrameCallback, startAnimationFrame } from '@manapotion/core'

export const useAnimationFrame = (callback: FrameCallback) => {
  let unsub = () => {}

  onMount(() => {
    unsub = startAnimationFrame(callback)
  })

  onDestroy(unsub)
}
