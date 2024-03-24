import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPointerLockListener } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPointerLockListener({
        onUpdate: (isPointerLocked: boolean) => emit('update', isPointerLocked),
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
