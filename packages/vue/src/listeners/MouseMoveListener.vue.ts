import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseMoveListener, MouseMovePayload } from '@manapotion/core'

export const MouseMoveListener = defineComponent({
  emits: { mouseMove: (payload: MouseMovePayload) => payload },
  props: { mouseMovementResetDelay: { type: Number, default: 30 } },
  setup: (props, { emit }) => {
    onMounted(() => {
      let unsub = mountMouseMoveListener({
        onMouseMove: payload => emit('mouseMove', payload),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      })
      watch(
        () => props.mouseMovementResetDelay,
        newDelay => {
          unsub()
          unsub = mountMouseMoveListener({
            onMouseMove: payload => emit('mouseMove', payload),
            mouseMovementResetDelay: newDelay,
          })
        },
      )
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
