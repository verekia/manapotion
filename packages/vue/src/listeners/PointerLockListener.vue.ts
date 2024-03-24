import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPointerLockListener, PointerLockListenerProps } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPointerLockListener({
        onUpdate: isPointerLocked => emit('update', isPointerLocked),
      } satisfies PointerLockListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
