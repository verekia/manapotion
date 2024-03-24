import { defineComponent, onMounted, onUnmounted } from 'vue'

import { KeyboardListenerProps, mountKeyboardListener } from '@manapotion/core'

export const KeyboardListener = defineComponent({
  emits: ['keyDown', 'keyUp'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountKeyboardListener({
        onKeyDown: keyState => emit('keyDown', keyState),
        onKeyUp: (code, key) => emit('keyUp', code, key),
      } satisfies KeyboardListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
