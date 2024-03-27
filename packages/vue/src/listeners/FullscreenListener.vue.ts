import { defineComponent, onMounted, onUnmounted } from 'vue'

import { FullscreenChangePayload, mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = defineComponent({
  emits: { fullscreenChange: (payload: FullscreenChangePayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountFullscreenListener({
        onFullscreenChange: payload => emit('fullscreenChange', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
