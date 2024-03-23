import { defineComponent, onMounted, onUnmounted } from 'vue'

import { handleBlur, handleFocus } from '@manapotion/core'

export const PageFocusListener = defineComponent({
  emits: ['blur', 'focus'],
  props: {
    clearInputsOnBlur: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const blurHandler = handleBlur({
      onPageBlur: () => emit('blur'),
      clearInputsOnBlur: props.clearInputsOnBlur,
    })
    const focusHandler = handleFocus({ onPageFocus: () => emit('focus') })

    onMounted(() => {
      window.addEventListener('blur', blurHandler)
      window.addEventListener('focus', focusHandler)
    })
    onUnmounted(() => {
      window.removeEventListener('blur', blurHandler)
      window.removeEventListener('focus', focusHandler)
    })
  },
  render() {
    return null
  },
})
