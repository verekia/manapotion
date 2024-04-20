import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountKeyboardListener } from '@manapotion/core'

import type { KeyDownPayload, KeyUpPayload } from '@manapotion/core'

export const KeyboardListener = defineComponent({
  emits: {
    keyDown: (payload: KeyDownPayload) => payload,
    keyUp: (payload: KeyUpPayload) => payload,
  },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountKeyboardListener({
        onKeyDown: payload => emit('keyDown', payload),
        onKeyUp: payload => emit('keyUp', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
