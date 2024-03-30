<script setup lang="ts">
import { onBeforeUpdate } from 'vue'

import { browser, enterFullscreen, exitFullscreen } from '@manapotion/vue'

onBeforeUpdate(() => {
  console.log('FullscreenButton re-render ')
})
</script>

<template>
  <button @click="browser.isFullscreen ? exitFullscreen() : enterFullscreen()">
    {{ browser.isFullscreen ? 'Exit' : 'Enter' }} fullscreen
  </button>
</template>
