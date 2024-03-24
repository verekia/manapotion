import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseScrollListener, MouseScrollListenerProps } from '@manapotion/core'

export const MouseScrollListener = defineComponent({
  emits: ['scroll'],
  props: { mouseScrollResetDelay: { type: Number, default: 100 } },
  setup(props, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountMouseScrollListener({
        onScroll: deltaY => emit('scroll', deltaY),
        mouseScrollResetDelay: props.mouseScrollResetDelay,
      } satisfies MouseScrollListenerProps)
    })

    watch(
      () => props.mouseScrollResetDelay,
      newDelay => {
        unsub()
        unsub = mountMouseScrollListener({
          onScroll: deltaY => emit('scroll', deltaY),
          mouseScrollResetDelay: newDelay,
        } satisfies MouseScrollListenerProps)
      },
    )

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
