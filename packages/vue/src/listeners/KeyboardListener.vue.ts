import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountKeyboardListener } from '@manapotion/core'

export const KeyboardListener = defineComponent({
  emits: ['keyDown', 'keyUp'],
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountKeyboardListener({
        onKeyDown: keyState => emit('keyDown', keyState),
        onKeyUp: (code, key) => emit('keyUp', code, key),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
