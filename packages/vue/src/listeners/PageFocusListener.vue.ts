import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountBlurListener, mountFocusListener } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: ['update'],
  props: {
    clearInputsOnBlur: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    let unsubBlur = () => {}
    let unsubFocus = () => {}

    onMounted(() => {
      unsubBlur = mountBlurListener({
        onUpdate: (isPageFocused: boolean) => emit('update', isPageFocused),
        clearInputsOnBlur: props.clearInputsOnBlur,
      })
      unsubFocus = mountFocusListener({
        onUpdate: (isPageFocused: boolean) => emit('update', isPageFocused),
      })
    })

    watch(
      () => props.clearInputsOnBlur,
      newClearInputsOnBlur => {
        unsubBlur()
        unsubBlur = mountBlurListener({
          onUpdate: (isPageFocused: boolean) => emit('update', isPageFocused),
          clearInputsOnBlur: newClearInputsOnBlur,
        })
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
