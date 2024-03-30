import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountBlurListener, mountFocusListener, PageFocusChangePayload } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  props: { clearInputsOnBlur: { type: Boolean, default: true } },
  emits: { pageFocusChange: (payload: PageFocusChangePayload) => payload },
  setup: (props, { emit }) => {
    onMounted(() => {
      let unsubBlur = mountBlurListener({
        onPageFocusChange: payload => emit('pageFocusChange', payload),
        clearInputsOnBlur: props.clearInputsOnBlur,
      })
      const unsubFocus = mountFocusListener({
        onPageFocusChange: payload => emit('pageFocusChange', payload),
      })
      watch(
        () => props.clearInputsOnBlur,
        newClearInputsOnBlur => {
          unsubBlur()
          unsubBlur = mountBlurListener({
            onPageFocusChange: payload => emit('pageFocusChange', payload),
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
