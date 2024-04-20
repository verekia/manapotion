import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPageVisibilityListener } from '@manapotion/core'

import type { PageVisibilityPayload } from '@manapotion/core'

export const PageVisibilityListener = defineComponent({
  emits: { pageVisibilityChange: (payload: PageVisibilityPayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountPageVisibilityListener({
        onPageVisibilityChange: payload => emit('pageVisibilityChange', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
