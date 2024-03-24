import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPointerLockListener } from '@manapotion/core'

export const PointerLockListener = defineComponent({
  emits: ['pointerlockchange'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPointerLockListener((isPointerLocked: boolean) =>
        emit('pointerlockchange', isPointerLocked),
      )
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
