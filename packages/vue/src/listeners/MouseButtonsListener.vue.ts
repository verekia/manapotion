import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountMouseButtonsListener } from '@manapotion/core'

export const MouseButtonsListener = defineComponent({
  emits: [
    'left-mouse-down',
    'middle-mouse-down',
    'right-mouse-down',
    'left-mouse-up',
    'middle-mouse-up',
    'right-mouse-up',
  ],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountMouseButtonsListener({
        onLeftMouseDown: () => emit('left-mouse-down'),
        onMiddleMouseDown: () => emit('middle-mouse-down'),
        onRightMouseDown: () => emit('right-mouse-down'),
        onLeftMouseUp: () => emit('left-mouse-up'),
        onMiddleMouseUp: () => emit('middle-mouse-up'),
        onRightMouseUp: () => emit('right-mouse-up'),
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
