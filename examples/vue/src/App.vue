<script setup lang="ts">
// @ts-expect-error TS can't find the module, but it works
import { Listeners, isFullscreen } from '@manapotion/vue'
import FullscreenButton from './FullscreenButton.vue'
import PointerLockButton from './PointerLockButton.vue'

const handleFullscreenChange = (event: Event) => {
  console.log('Fullscreen change!', event)
}

const handlePointerLockChange = (event: Event) => {
  console.log('Pointer lock change!', event)
}
</script>

<template>
  <FullscreenButton />
  <PointerLockButton />
  <Listeners @fullscreenchange="handleFullscreenChange" @pointerlockchange="handlePointerLockChange" />
</template>
