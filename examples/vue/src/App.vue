<script setup lang="ts">
import { ref } from 'vue'

import { isPageFocused, isPageVisible, Listeners, mp, useAnimationFrame } from '@manapotion/vue'

import FullscreenButton from './FullscreenButton.vue'
import PointerLockButton from './PointerLockButton.vue'

const handleFullscreenChange = (event: Event) => {
  console.log('Fullscreen change!', event)
}

const handlePointerLockChange = (isPointerLocked: boolean) => {
  console.log('Pointer lock change!', isPointerLocked)
}

const mouseXRef = ref<HTMLSpanElement | null>(null)
const mouseYRef = ref<HTMLSpanElement | null>(null)
const mouseMovementXRef = ref<HTMLSpanElement | null>(null)
const mouseMovementYRef = ref<HTMLSpanElement | null>(null)

useAnimationFrame(() => {
  const { mouseX, mouseY, mouseMovementX, mouseMovementY } = mp()

  mouseXRef.value!.textContent = String(mouseX)
  mouseYRef.value!.textContent = String(mouseY)
  mouseMovementXRef.value!.textContent = String(mouseMovementX)
  mouseMovementYRef.value!.textContent = String(mouseMovementY)
})

const moveResetDelay = ref(1000)

const handleToggleMoveResetDelay = () => {
  moveResetDelay.value = moveResetDelay.value === 1000 ? 200 : 1000
}

const handlePageVisibilityChange = (isVisible: boolean) => {
  console.log('Page visibility change!', isVisible)
}
</script>

<template>
  <FullscreenButton />
  <PointerLockButton />
  <div>Mouse position: <span ref="mouseXRef"></span> <span ref="mouseYRef"></span></div>
  <div>
    Mouse movement: <span ref="mouseMovementXRef"></span> <span ref="mouseMovementYRef"></span>
  </div>
  <div>Is page visible: {{ isPageVisible }}</div>
  <div>Is page focused: {{ isPageFocused }}</div>
  Toggle mouse reset delay between 1s and 200ms:
  <button @click="handleToggleMoveResetDelay">{{ moveResetDelay }}ms</button>

  <Listeners
    :mouseMoveResetDelay="moveResetDelay"
    @fullscreenchange="handleFullscreenChange"
    @pointerlockchange="handlePointerLockChange"
    @visibilitychange="handlePageVisibilityChange"
  />
</template>
