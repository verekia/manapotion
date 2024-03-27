import { defineComponent, onMounted, onUnmounted } from 'vue'

import { KeyDownPayload, KeyUpPayload, mountKeyboardListener } from '@manapotion/core'

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
