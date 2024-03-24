import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseMoveListener, MouseMoveListenerProps } from '@manapotion/core'

export const MouseMoveListener = defineComponent({
  emits: ['mouse-move'],
  props: { mouseMovementResetDelay: { type: Number, default: 30 } },
  setup(props, { emit }) {
    let unsub = () => {}
    onMounted(() => {
      unsub = mountMouseMoveListener({
        onMouseMove: (x, y, movementX, movementY) => emit('mouse-move', x, y, movementX, movementY),
        mouseMovementResetDelay: props.mouseMovementResetDelay,
      } satisfies MouseMoveListenerProps)
    })

    watch(
      () => props.mouseMovementResetDelay,
      newDelay => {
        unsub()
        unsub = mountMouseMoveListener({
          onMouseMove: (x, y, movementX, movementY) =>
            emit('mouse-move', x, y, movementX, movementY),
          mouseMovementResetDelay: newDelay,
        } satisfies MouseMoveListenerProps)
      },
    )

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
