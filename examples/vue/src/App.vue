<script setup lang="ts">
import { enterFullscreen, exitFullscreen } from '@manapotion/browser'
// @ts-expect-error TS can't find the module, but it works
import { Listeners, isFullscreen } from '@manapotion/vue'

const handleFullscreenChange = (event: Event) => {
  console.log('Fullscreen change!', event)
}
</script>

<template>
  <button @click="isFullscreen ? exitFullscreen() : enterFullscreen()">
    {{ isFullscreen ? 'Exit' : 'Enter' }} fullscreen
  </button>
  <Listeners @fullscreenchange="handleFullscreenChange"/>
</template>
