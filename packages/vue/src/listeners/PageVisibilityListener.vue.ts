import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPageVisibilityListener, PageVisibilityListenerProps } from '@manapotion/core'

export const PageVisibilityListener = defineComponent({
  emits: ['pageVisibilityChange'],
  setup(_, { emit }) {
    onMounted(() => {
      const unsub = mountPageVisibilityListener({
        onPageVisibilityChange: isVisible => emit('pageVisibilityChange', isVisible),
      } satisfies PageVisibilityListenerProps)

      onUnmounted(unsub)
    })
  },
  render() {
    return null
  },
})
