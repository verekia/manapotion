import { defineComponent, onMounted, onUnmounted } from 'vue'

import { KeyState, mountKeyboardListener } from '@manapotion/core'

export const KeyboardListener = defineComponent({
  emits: ['key-down', 'key-up'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountKeyboardListener({
        onKeyDown: (keyState: KeyState) => emit('key-down', keyState),
        onKeyUp: (code: string, key: string) => emit('key-up', code, key),
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
