import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPageVisibilityListener, PageVisibilityListenerProps } from '@manapotion/core'

export const PageVisibilityListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPageVisibilityListener({
        onUpdate: isVisible => emit('update', isVisible),
      } satisfies PageVisibilityListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
