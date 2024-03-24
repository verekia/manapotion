import { defineComponent, onMounted, onUnmounted, watch } from 'vue'

import { mountMouseScrollListener } from '@manapotion/core'

export const MouseScrollListener = defineComponent({
  emits: ['scroll'],
  props: {
    mouseScrollResetDelay: {
      type: Number,
      default: 100,
    },
  },
  setup(props, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountMouseScrollListener({
        onScroll: (deltaY: number) => emit('scroll', deltaY),
        mouseScrollResetDelay: props.mouseScrollResetDelay,
      })
    })

    watch(
      () => props.mouseScrollResetDelay,
      newDelay => {
        unsub()
        unsub = mountMouseScrollListener({
          onScroll: (deltaY: number) => emit('scroll', deltaY),
          mouseScrollResetDelay: newDelay,
        })
      },
    )

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
