import { defineComponent, onMounted, onUnmounted } from 'vue'

import { handleVisibilityChange } from '@manapotion/core'

export const PageVisibilityListener = defineComponent({
  emits: ['visibilitychange'],
  setup(_, { emit }) {
    const handler = handleVisibilityChange({
      onChange: (isPageVisible: boolean) => emit('visibilitychange', isPageVisible),
    })

    onMounted(() => document.addEventListener('visibilitychange', handler))
    onUnmounted(() => document.removeEventListener('visibilitychange', handler))
  },
  render() {
    return null
  },
})
