import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseMoveListener } from '@manapotion/core'

export const MouseMoveListener = defineComponent({
  emits: ['update'],
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
        onUpdate: (x: number, y: number, movementX: number, movementY: number) =>
          emit('update', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      })
    })

    watch(
      () => props.mouseMovementResetDelay,
      newDelay => {
        unsub()
        unsub = mountMouseMoveListener({
          onUpdate: (x: number, y: number, movementX: number, movementY: number) =>
            emit('update', x, y, movementX, movementY),
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
