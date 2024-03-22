<script setup lang="ts">
// @ts-expect-error
import { onBeforeUpdate } from 'vue'
import { enterFullscreen, exitFullscreen } from '@manapotion/browser'
// @ts-expect-error
import { isFullscreen } from '@manapotion/vue'

onBeforeUpdate(() => {
  console.log('FullscreenButton re-render ')
})
</script>

<template>
  <button @click="isFullscreen ? exitFullscreen() : enterFullscreen()">
    {{ isFullscreen ? 'Exit' : 'Enter' }} fullscreen
  </button>
  
</template>
