import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPageVisibilityListener, PageVisibilityListenerProps } from '@manapotion/core'

export const PageVisibilityListener = defineComponent({
  emits: ['page-visibility-change'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPageVisibilityListener({
        onPageVisibilityChange: isVisible => emit('page-visibility-change', isVisible),
      } satisfies PageVisibilityListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
