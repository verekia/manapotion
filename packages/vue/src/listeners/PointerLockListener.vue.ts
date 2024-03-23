import { defineComponent, onMounted, onUnmounted } from 'vue'

import { handlePointerLockChange } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: ['pointerlockchange'],
  setup(_, { emit }) {
    const handler = handlePointerLockChange({
      onChange: (isPointerLocked: boolean) => emit('pointerlockchange', isPointerLocked),
    })

    onMounted(() => document.addEventListener('pointerlockchange', handler))
    onUnmounted(() => document.removeEventListener('pointerlockchange', handler))
  },
  render() {
    return null
  },
})
