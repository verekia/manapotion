import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseScrollListener, MouseScrollPayload } from '@manapotion/core'

export const MouseScrollListener = defineComponent({
  emits: { scroll: (payload: MouseScrollPayload) => payload },
  props: { mouseScrollResetDelay: { type: Number, default: 100 } },
  setup: (props, { emit }) => {
    onMounted(() => {
      let unsub = mountMouseScrollListener({
        onScroll: payload => emit('scroll', payload),
        mouseScrollResetDelay: props.mouseScrollResetDelay,
      })
      watch(
        () => props.mouseScrollResetDelay,
        newDelay => {
          unsub()
          unsub = mountMouseScrollListener({
            onScroll: payload => emit('scroll', payload),
            mouseScrollResetDelay: newDelay,
          })
        },
      )
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
