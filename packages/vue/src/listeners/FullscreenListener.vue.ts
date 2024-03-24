import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountFullscreenListener({
        onUpdate: (isFullscreen: boolean) => emit('update', isFullscreen),
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
