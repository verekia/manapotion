import { ref } from 'vue'

import { manaPotionStore } from '@manapotion/store'

// It probably doesn't make sense to expose individual properties
// like this but this is a first step.
export const isFullscreen = ref(manaPotionStore.getState().isFullscreen)

manaPotionStore.subscribe(() => {
  isFullscreen.value = manaPotionStore.getState().isFullscreen
})
