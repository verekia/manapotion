import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountBlurListener, mountFocusListener, PageFocusChangePayload } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: { pageFocusChange: (payload: PageFocusChangePayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsubBlur = mountBlurListener({
        onPageFocusChange: payload => emit('pageFocusChange', payload),
      })
      const unsubFocus = mountFocusListener({
        onPageFocusChange: payload => emit('pageFocusChange', payload),
      })
      onUnmounted(() => {
        unsubBlur()
        unsubFocus()
      })
    })
  },
  render: () => null,
})
