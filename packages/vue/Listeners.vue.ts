import { defineComponent, onMounted, onUnmounted } from 'vue'
import { mp } from '@manapotion/store'

export const Listeners = defineComponent({
  emits: ['pointerLockChange'],
  setup(_, { emit }) {
    const handlePointerLockChange = () => {
      const isPointerLocked = Boolean(document.pointerLockElement)
      mp().setPointerLocked(isPointerLocked)
      emit('pointerLockChange', isPointerLocked)
    }

    onMounted(() => {
      document.addEventListener('pointerlockchange', handlePointerLockChange)
    })

    onUnmounted(() => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
    })
  },
})
