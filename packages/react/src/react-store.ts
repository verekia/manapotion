import { ManaPotionState, manaPotionStore } from '@manapotion/core'
import { useStore } from 'zustand'

export function useMP(): ManaPotionState
export function useMP<T>(selector: (state: ManaPotionState) => T): T
export function useMP<T>(selector?: (state: ManaPotionState) => T) {
  return useStore(manaPotionStore, selector!)
}
