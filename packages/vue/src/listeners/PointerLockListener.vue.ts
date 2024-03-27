import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPointerLockListener, PointerLockChangePayload } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: { pointerLockChange: (payload: PointerLockChangePayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountPointerLockListener({
        onPointerLockChange: payload => emit('pointerLockChange', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
