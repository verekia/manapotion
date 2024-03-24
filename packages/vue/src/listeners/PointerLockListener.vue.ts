import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPointerLockListener, PointerLockListenerProps } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: ['pointer-lock-change'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPointerLockListener({
        onPointerLockChange: isPointerLocked => emit('pointer-lock-change', isPointerLocked),
      } satisfies PointerLockListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
