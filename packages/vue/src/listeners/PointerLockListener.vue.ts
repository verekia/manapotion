import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPointerLockListener } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: ['pointerLockChange'],
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountPointerLockListener({
        onPointerLockChange: isPointerLocked => emit('pointerLockChange', isPointerLocked),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
