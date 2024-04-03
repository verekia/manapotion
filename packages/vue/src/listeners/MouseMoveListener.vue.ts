import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseMoveListener, MouseMovePayload } from '@manapotion/core'

export const MouseMoveListener = defineComponent({
  // eslint-disable-next-line vue/require-default-prop
  props: { mouseMovementResetDelay: { type: Number } },
  emits: { mouseMove: (payload: MouseMovePayload) => payload },
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
