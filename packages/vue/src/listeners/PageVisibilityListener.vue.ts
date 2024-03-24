import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountPageVisibilityListener } from '@manapotion/core'

export const PageVisibilityListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountPageVisibilityListener({
        onUpdate: (isVisible: boolean) => {
          emit('update', isVisible)
        },
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
