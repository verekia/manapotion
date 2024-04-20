import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPageFocusListener } from '@manapotion/core'

import type { PageFocusChangePayload } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: { pageFocusChange: (payload: PageFocusChangePayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountPageFocusListener({
        onPageFocusChange: payload => emit('pageFocusChange', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
