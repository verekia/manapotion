import { defineComponent, onMounted, onUnmounted } from 'vue'
import { mp } from '@manapotion/store'

export const Listeners = defineComponent({
  emits: ['fullscreenchange'],
  setup(_, { emit }) {
    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement)
      mp().setFullscreen(isFullscreen)
      emit('fullscreenchange', isFullscreen)
    }

    onMounted(() => document.addEventListener('fullscreenchange', handleFullscreenChange))
    onUnmounted(() => document.removeEventListener('fullscreenchange', handleFullscreenChange))
  },
  render() {
    return null
  },
})
