import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPageVisibilityListener } from '@manapotion/core'

export const PageVisibilityListener = defineComponent({
  emits: ['pageVisibilityChange'],
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountPageVisibilityListener({
        onPageVisibilityChange: isVisible => emit('pageVisibilityChange', isVisible),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
