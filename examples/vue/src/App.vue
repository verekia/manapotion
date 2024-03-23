<script setup lang="ts">
import { ref } from 'vue'

import { Listeners, mp, useAnimationFrame } from '@manapotion/vue'

import FullscreenButton from './FullscreenButton.vue'
import PointerLockButton from './PointerLockButton.vue'

const handleFullscreenChange = (event: Event) => {
  console.log('Fullscreen change!', event)
}

const handlePointerLockChange = (event: Event) => {
  console.log('Pointer lock change!', event)
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
</script>

<template>
  <FullscreenButton />
  <PointerLockButton />
  <div>Mouse position: <span ref="mouseXRef"></span> <span ref="mouseYRef"></span></div>
  <div>
    Mouse movement: <span ref="mouseMovementXRef"></span> <span ref="mouseMovementYRef"></span>
  </div>
  <Listeners
    @fullscreenchange="handleFullscreenChange"
    @pointerlockchange="handlePointerLockChange"
  />
</template>
