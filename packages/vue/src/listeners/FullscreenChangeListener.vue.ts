import { defineComponent, onMounted, onUnmounted } from 'vue'

import { handleFullscreenChange } from '@manapotion/core'

export const FullscreenChangeListener = defineComponent({
  emits: ['fullscreenchange'],
  setup(_, { emit }) {
    const handler = handleFullscreenChange({
      onChange: (isFullscreen: boolean) => emit('fullscreenchange', isFullscreen),
    })

    onMounted(() => document.addEventListener('fullscreenchange', handler))
    onUnmounted(() => document.removeEventListener('fullscreenchange', handler))
  },
  render() {
    return null
  },
})
