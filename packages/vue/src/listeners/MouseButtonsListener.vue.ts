import { defineComponent, onMounted, onUnmounted } from 'vue'

import {
  LeftMouseDownPayload,
  LeftMouseUpPayload,
  MiddleMouseDownPayload,
  MiddleMouseUpPayload,
  mountMouseButtonsListener,
  RightMouseDownPayload,
  RightMouseUpPayload,
} from '@manapotion/core'

export const MouseButtonsListener = defineComponent({
  emits: {
    leftMouseDown: (payload: LeftMouseDownPayload) => payload,
    middleMouseDown: (payload: MiddleMouseDownPayload) => payload,
    rightMouseDown: (payload: RightMouseDownPayload) => payload,
    leftMouseUp: (payload: LeftMouseUpPayload) => payload,
    middleMouseUp: (payload: MiddleMouseUpPayload) => payload,
    rightMouseUp: (payload: RightMouseUpPayload) => payload,
  },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountMouseButtonsListener({
        onLeftMouseDown: payload => emit('leftMouseDown', payload),
        onMiddleMouseDown: payload => emit('middleMouseDown', payload),
        onRightMouseDown: payload => emit('rightMouseDown', payload),
        onLeftMouseUp: payload => emit('leftMouseUp', payload),
        onMiddleMouseUp: payload => emit('middleMouseUp', payload),
        onRightMouseUp: payload => emit('rightMouseUp', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
