import { browserStore, joysticksStore, keyboardStore, mouseStore } from '@manapotion/core'
import { readable } from 'svelte/store'

export const browser = readable(browserStore.getState(), set =>
  browserStore.subscribe(value => set(value)),
)

export const mouse = readable(mouseStore.getState(), set =>
  mouseStore.subscribe(value => set(value)),
)

export const keyboard = readable(keyboardStore.getState(), set =>
  keyboardStore.subscribe(value => set(value)),
)

export const joysticks = readable(joysticksStore.getState(), set =>
  joysticksStore.subscribe(value => set(value)),
)
