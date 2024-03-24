import { defineComponent, onMounted, onUnmounted } from 'vue'

import { FullscreenListenerProps, mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = defineComponent({
  emits: ['fullscreen-change'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountFullscreenListener({
        onFullscreenChange: isFullscreen => emit('fullscreen-change', isFullscreen),
      } satisfies FullscreenListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
