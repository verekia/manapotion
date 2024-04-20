import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountScreenOrientationListener } from '@manapotion/core'

import type { ScreenOrientationChangePayload } from '@manapotion/core'

export const ScreenOrientationListener = defineComponent({
  emits: { screenOrientationChange: (payload: ScreenOrientationChangePayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountScreenOrientationListener({
        onScreenOrientationChange: payload => emit('screenOrientationChange', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
