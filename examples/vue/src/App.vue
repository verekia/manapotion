<script setup lang="ts">
import { enterFullscreen } from '@manapotion/browser'
// import { Listeners } from '@manapotion/vue'
</script>

<template>
  <button @click="enterFullscreen">Enter Fullscreen</button>
  <Listener />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>