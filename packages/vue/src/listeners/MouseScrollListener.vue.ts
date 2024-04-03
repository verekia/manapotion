import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseScrollListener, MouseScrollPayload } from '@manapotion/core'

export const MouseScrollListener = defineComponent({
  // eslint-disable-next-line vue/require-default-prop
  props: { mouseScrollResetDelay: { type: Number } },
  emits: { scroll: (payload: MouseScrollPayload) => payload },
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
