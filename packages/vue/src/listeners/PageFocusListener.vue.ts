import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountBlurListener, mountFocusListener, PageFocusListenerProps } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: ['update'],
  props: { clearInputsOnBlur: { type: Boolean, default: true } },
  setup(props, { emit }) {
    let unsubBlur = () => {}
    let unsubFocus = () => {}

    onMounted(() => {
      unsubBlur = mountBlurListener({
        onUpdate: isPageFocused => emit('update', isPageFocused),
        clearInputsOnBlur: props.clearInputsOnBlur,
      } satisfies PageFocusListenerProps)

      unsubFocus = mountFocusListener({
        onUpdate: isPageFocused => emit('update', isPageFocused),
      } satisfies PageFocusListenerProps)
    })

    watch(
      () => props.clearInputsOnBlur,
      newClearInputsOnBlur => {
        unsubBlur()
        unsubBlur = mountBlurListener({
          onUpdate: isPageFocused => emit('update', isPageFocused),
          clearInputsOnBlur: newClearInputsOnBlur,
        } satisfies PageFocusListenerProps)
      },
    )

    onUnmounted(() => {
      unsubBlur()
      unsubFocus()
    })
  },
  render() {
    return null
  },
})
