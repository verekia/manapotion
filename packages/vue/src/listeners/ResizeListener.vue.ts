import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountResizeListener } from '@manapotion/core'

import type { ResizePayload } from '@manapotion/core'

export const ResizeListener = defineComponent({
  emits: { resize: (payload: ResizePayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountResizeListener({
        onResize: payload => emit('resize', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
