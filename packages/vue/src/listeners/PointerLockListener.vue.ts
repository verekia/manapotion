import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPointerLockListener, PointerLockListenerProps } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: ['pointerLockChange'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPointerLockListener({
        onPointerLockChange: isPointerLocked => emit('pointerLockChange', isPointerLocked),
      } satisfies PointerLockListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
