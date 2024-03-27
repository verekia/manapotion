import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountResizeListener } from '@manapotion/core'

export const ResizeListener = defineComponent({
  emits: ['resize'],
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountResizeListener({
        onResize: ({ width, height, isLandscape, isPortrait }) =>
          emit('resize', { width, height, isLandscape, isPortrait }),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
