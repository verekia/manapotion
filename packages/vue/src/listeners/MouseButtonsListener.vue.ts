import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountMouseButtonsListener } from '@manapotion/core'

import type {
  LeftMouseButtonDownPayload,
  LeftMouseButtonUpPayload,
  MiddleMouseButtonDownPayload,
  MiddleMouseButtonUpPayload,
  RightMouseButtonDownPayload,
  RightMouseButtonUpPayload,
} from '@manapotion/core'

export const MouseButtonsListener = defineComponent({
  emits: {
    leftMouseButtonDown: (payload: LeftMouseButtonDownPayload) => payload,
    middleMouseButtonDown: (payload: MiddleMouseButtonDownPayload) => payload,
    rightMouseButtonDown: (payload: RightMouseButtonDownPayload) => payload,
    leftMouseButtonUp: (payload: LeftMouseButtonUpPayload) => payload,
    middleMouseButtonUp: (payload: MiddleMouseButtonUpPayload) => payload,
    rightMouseButtonUp: (payload: RightMouseButtonUpPayload) => payload,
  },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountMouseButtonsListener({
        onLeftMouseButtonDown: payload => emit('leftMouseButtonDown', payload),
        onMiddleMouseButtonDown: payload => emit('middleMouseButtonDown', payload),
        onRightMouseButtonDown: payload => emit('rightMouseButtonDown', payload),
        onLeftMouseButtonUp: payload => emit('leftMouseButtonUp', payload),
        onMiddleMouseButtonUp: payload => emit('middleMouseButtonUp', payload),
        onRightMouseButtonUp: payload => emit('rightMouseButtonUp', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
