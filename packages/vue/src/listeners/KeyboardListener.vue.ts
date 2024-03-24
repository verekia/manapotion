import { defineComponent, onMounted, onUnmounted } from 'vue'

import { KeyboardListenerProps, mountKeyboardListener } from '@manapotion/core'

export const KeyboardListener = defineComponent({
  emits: ['key-down', 'key-up'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountKeyboardListener({
        onKeyDown: keyState => emit('key-down', keyState),
        onKeyUp: (code, key) => emit('key-up', code, key),
      } satisfies KeyboardListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
