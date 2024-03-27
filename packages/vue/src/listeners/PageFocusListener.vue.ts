import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountBlurListener, mountFocusListener, PageFocusListenerProps } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: ['pageFocusChange'],
  props: { clearInputsOnBlur: { type: Boolean, default: true } },
  setup(props, { emit }) {
    onMounted(() => {
      let unsubBlur = mountBlurListener({
        onPageFocusChange: isPageFocused => emit('pageFocusChange', isPageFocused),
        clearInputsOnBlur: props.clearInputsOnBlur,
      } satisfies PageFocusListenerProps)

      const unsubFocus = mountFocusListener({
        onPageFocusChange: isPageFocused => emit('pageFocusChange', isPageFocused),
      } satisfies PageFocusListenerProps)

      watch(
        () => props.clearInputsOnBlur,
        newClearInputsOnBlur => {
          unsubBlur()
          unsubBlur = mountBlurListener({
            onPageFocusChange: isPageFocused => emit('pageFocusChange', isPageFocused),
            clearInputsOnBlur: newClearInputsOnBlur,
          } satisfies PageFocusListenerProps)
        },
      )

      onUnmounted(() => {
        unsubBlur()
        unsubFocus()
      })
    })
  },
  render() {
    return null
  },
})
