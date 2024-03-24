import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountResizeListener } from '@manapotion/core'

export const ResizeListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountResizeListener({
        onUpdate: ({
          width,
          height,
          isLandscape,
          isPortrait,
        }: {
          width: number
          height: number
          isLandscape: boolean
          isPortrait: boolean
        }) => emit('update', { width, height, isLandscape, isPortrait }),
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
