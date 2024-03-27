import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountBlurListener, mountFocusListener } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: ['pageFocusChange'],
  props: { clearInputsOnBlur: { type: Boolean, default: true } },
  setup: (props, { emit }) => {
    onMounted(() => {
      let unsubBlur = mountBlurListener({
        onPageFocusChange: isPageFocused => emit('pageFocusChange', isPageFocused),
        clearInputsOnBlur: props.clearInputsOnBlur,
      })
      const unsubFocus = mountFocusListener({
        onPageFocusChange: isPageFocused => emit('pageFocusChange', isPageFocused),
      })
      watch(
        () => props.clearInputsOnBlur,
        newClearInputsOnBlur => {
          unsubBlur()
          unsubBlur = mountBlurListener({
            onPageFocusChange: isPageFocused => emit('pageFocusChange', isPageFocused),
            clearInputsOnBlur: newClearInputsOnBlur,
          })
        },
      )
      onUnmounted(() => {
        unsubBlur()
        unsubFocus()
      })
    })
  },
  render: () => null,
})
