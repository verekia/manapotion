import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = defineComponent({
  emits: ['fullscreenChange'],
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountFullscreenListener({
        onFullscreenChange: isFullscreen => emit('fullscreenChange', isFullscreen),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
