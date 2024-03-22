<script setup lang="ts">
import { enterFullscreen } from '@manapotion/browser'
// @ts-expect-error TS can't find the module, but it works
import { Listeners } from '@manapotion/vue'

const handleFullscreenChange = (event: Event) => {
  console.log('Fullscreen change!', event)
}
</script>

<template>
  <button @click="enterFullscreen">Enter Fullscreen</button>
  <Listeners @fullscreenchange="handleFullscreenChange"/>
</template>
