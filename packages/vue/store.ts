import { ref } from 'vue'

import { manaPotionStore } from '@manapotion/store'

export const isFullscreen = ref(manaPotionStore.getState().isFullscreen)
export const isPointerLocked = ref(manaPotionStore.getState().isPointerLocked)

manaPotionStore.subscribe(() => {
  isFullscreen.value = manaPotionStore.getState().isFullscreen
  isPointerLocked.value = manaPotionStore.getState().isPointerLocked
})
