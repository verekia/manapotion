import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountResizeListener, ResizeListenerProps } from '@manapotion/core'

export const ResizeListener = defineComponent({
  emits: ['resize'],
  setup(_, { emit }) {
    onMounted(() => {
      const unsub = mountResizeListener({
        onResize: ({ width, height, isLandscape, isPortrait }) =>
          emit('resize', { width, height, isLandscape, isPortrait }),
      } satisfies ResizeListenerProps)

      onUnmounted(unsub)
    })
  },
  render() {
    return null
  },
})
