import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountMouseButtonsListener, MouseButtonsListenerProps } from '@manapotion/core'

export const MouseButtonsListener = defineComponent({
  emits: [
    'leftMouseDown',
    'middleMouseDown',
    'rightMouseDown',
    'leftMouseUp',
    'middleMouseUp',
    'rightMouseUp',
  ],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountMouseButtonsListener({
        onLeftMouseDown: () => emit('leftMouseDown'),
        onMiddleMouseDown: () => emit('middleMouseDown'),
        onRightMouseDown: () => emit('rightMouseDown'),
        onLeftMouseUp: () => emit('leftMouseUp'),
        onMiddleMouseUp: () => emit('middleMouseUp'),
        onRightMouseUp: () => emit('rightMouseUp'),
      } satisfies MouseButtonsListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
