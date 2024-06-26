import { browserStore, joysticksStore, keyboardStore, mouseStore } from '@manapotion/core'
import { useStore } from 'zustand'

import type { Browser, Joysticks, Keyboard, Mouse } from '@manapotion/core'

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

export function useJoysticks(): Joysticks
export function useJoysticks<T>(selector: (state: Joysticks) => T): T
export function useJoysticks<T>(selector?: (state: Joysticks) => T) {
  return useStore(joysticksStore, selector!)
}
