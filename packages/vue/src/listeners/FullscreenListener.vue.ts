import { defineComponent, onMounted, onUnmounted } from 'vue'

import { FullscreenListenerProps, mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountFullscreenListener({
        onUpdate: isFullscreen => emit('update', isFullscreen),
      } satisfies FullscreenListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
