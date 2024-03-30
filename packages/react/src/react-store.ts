import { Browser, browserStore, Keyboard, keyboardStore, Mouse, mouseStore } from '@manapotion/core'
import { useStore } from 'zustand'

export function useBrowser(): Browser
export function useBrowser<T>(selector: (state: Browser) => T): T
export function useBrowser<T>(selector?: (state: Browser) => T) {
  return useStore(browserStore, selector!)
}

export function useMouse(): Mouse
export function useMouse<T>(selector: (state: Mouse) => T): T
export function useMouse<T>(selector?: (state: Mouse) => T) {
  return useStore(mouseStore, selector!)
}

export function useKeyboard(): Keyboard
export function useKeyboard<T>(selector: (state: Keyboard) => T): T
export function useKeyboard<T>(selector?: (state: Keyboard) => T) {
  return useStore(keyboardStore, selector!)
}
