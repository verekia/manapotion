import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountResizeListener } from '@manapotion/core'

export const ResizeListener = defineComponent({
  emits: ['resize'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountResizeListener(
        (params: { width: number; height: number; isLandscape: boolean; isPortrait: boolean }) =>
          emit('resize', params),
      )
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
