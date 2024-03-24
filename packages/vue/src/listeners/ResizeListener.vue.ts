import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountResizeListener, ResizeListenerProps } from '@manapotion/core'

export const ResizeListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountResizeListener({
        onUpdate: ({ width, height, isLandscape, isPortrait }) =>
          emit('update', { width, height, isLandscape, isPortrait }),
      } satisfies ResizeListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
