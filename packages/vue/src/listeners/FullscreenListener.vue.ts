import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = defineComponent({
  emits: ['fullscreenchange'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountFullscreenListener((isFullscreen: boolean) =>
        emit('fullscreenchange', isFullscreen),
      )
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
