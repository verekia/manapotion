import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseMoveListener } from '@manapotion/core'

export const MouseMoveListener = defineComponent({
  emits: ['mouseMove'],
  props: { mouseMovementResetDelay: { type: Number, default: 30 } },
  setup: (props, { emit }) => {
    onMounted(() => {
      let unsub = mountMouseMoveListener({
        onMouseMove: (x, y, movementX, movementY) => emit('mouseMove', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      })
      watch(
        () => props.mouseMovementResetDelay,
        newDelay => {
          unsub()
          unsub = mountMouseMoveListener({
            onMouseMove: (x, y, movementX, movementY) =>
              emit('mouseMove', x, y, movementX, movementY),
            mouseMovementResetDelay: newDelay,
          })
        },
      )
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
