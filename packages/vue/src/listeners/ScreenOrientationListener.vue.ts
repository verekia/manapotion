import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountScreenOrientationListener, ScreenOrientationListenerProps } from '@manapotion/core'

export const ScreenOrientationListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountScreenOrientationListener({
        onUpdate: ({ isPortrait, isLandscape }) => emit('update', { isPortrait, isLandscape }),
      } satisfies ScreenOrientationListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
