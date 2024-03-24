import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountBlurListener, mountFocusListener } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: ['blur', 'focus'],
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
        onPageBlur: () => emit('blur'),
        clearInputsOnBlur: props.clearInputsOnBlur,
      })
      unsubFocus = mountFocusListener(() => emit('focus'))
    })

    watch(
      () => props.clearInputsOnBlur,
      newClearInputsOnBlur => {
        unsubBlur()
        unsubBlur = mountBlurListener({
          onPageBlur: () => emit('blur'),
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
