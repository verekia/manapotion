import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountMouseButtonsListener } from '@manapotion/core'

export const MouseButtonsListener = defineComponent({
  emits: [
    'leftMouseDown',
    'middleMouseDown',
    'rightMouseDown',
    'leftMouseUp',
    'middleMouseUp',
    'rightMouseUp',
  ],
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountMouseButtonsListener({
        onLeftMouseDown: () => emit('leftMouseDown'),
        onMiddleMouseDown: () => emit('middleMouseDown'),
        onRightMouseDown: () => emit('rightMouseDown'),
        onLeftMouseUp: () => emit('leftMouseUp'),
        onMiddleMouseUp: () => emit('middleMouseUp'),
        onRightMouseUp: () => emit('rightMouseUp'),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
