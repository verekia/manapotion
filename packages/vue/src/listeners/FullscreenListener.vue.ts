import { defineComponent, onMounted, onUnmounted } from 'vue'

import { FullscreenListenerProps, mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = defineComponent({
  emits: ['fullscreenChange'],
  setup(_, { emit }) {
    onMounted(() => {
      const unsub = mountFullscreenListener({
        onFullscreenChange: isFullscreen => emit('fullscreenChange', isFullscreen),
      } satisfies FullscreenListenerProps)

      onUnmounted(unsub)
    })
  },
  render() {
    return null
  },
})
