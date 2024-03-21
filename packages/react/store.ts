import { useStore } from 'zustand'

import { manaPotionStore, ManaPotionState } from '@manapotion/store'

export { mp } from '@manapotion/store'

export function useMP(): ManaPotionState
export function useMP<T>(selector: (state: ManaPotionState) => T): T
export function useMP<T>(selector?: (state: ManaPotionState) => T) {
  return useStore(manaPotionStore, selector!)
}
