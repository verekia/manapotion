import { reactive } from 'vue'

import { browserStore, keyboardStore, mouseStore } from '@manapotion/core'

export const browser = reactive(browserStore.getInitialState())
browserStore.subscribe(state => Object.assign(browser, state))

export const mouse = reactive(mouseStore.getInitialState())
mouseStore.subscribe(state => Object.assign(mouse, state))

export const keyboard = reactive(keyboardStore.getInitialState())
keyboardStore.subscribe(state => Object.assign(keyboard, state))
