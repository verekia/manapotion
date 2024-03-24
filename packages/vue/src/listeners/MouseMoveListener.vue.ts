import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseMoveListener } from '@manapotion/core'

export const MouseMoveListener = defineComponent({
  emits: ['mousemove'],
  props: {
    mouseMovementResetDelay: {
      type: Number,
      default: 30,
    },
  },
  setup(props, { emit }) {
    let unsub = () => {}
    onMounted(() => {
      unsub = mountMouseMoveListener({
        onMove: (x: number, y: number, movementX: number, movementY: number) =>
          emit('mousemove', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      })
    })

    watch(
      () => props.mouseMovementResetDelay,
      newDelay => {
        unsub()
        unsub = mountMouseMoveListener({
          onMove: (x: number, y: number, movementX: number, movementY: number) =>
            emit('mousemove', x, y, movementX, movementY),
          mouseMovementResetDelay: newDelay,
        })
      },
    )

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
