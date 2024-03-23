import { defineComponent, onUnmounted, watchEffect } from 'vue'

import { handleMouseMove } from '@manapotion/core'

export const MouseMoveListener = defineComponent({
  emits: ['mousemove'],
  props: {
    mouseMoveResetDelay: {
      type: Number,
      default: 30,
    },
  },
  setup(props, { emit }) {
    let currentHandler: ((e: MouseEvent) => void) | null = null

    watchEffect(() => {
      if (currentHandler) {
        document.removeEventListener('mousemove', currentHandler)
        currentHandler = null
      }

      const newHandler = handleMouseMove({
        onMove: (x: number, y: number, movementX: number, movementY: number) =>
          emit('mousemove', x, y, movementX, movementY),
        mouseMoveResetDelay: props.mouseMoveResetDelay,
      })

      document.addEventListener('mousemove', newHandler)
      currentHandler = newHandler
    })

    onUnmounted(() => {
      if (currentHandler) {
        document.removeEventListener('mousemove', currentHandler)
      }
    })
  },
  render() {
    return null
  },
})
