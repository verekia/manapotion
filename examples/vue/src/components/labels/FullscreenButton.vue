<script setup lang="ts">
import { computed } from 'vue'

import { browser, enterFullscreen, exitFullscreen } from '@manapotion/vue'

const toggleFullscreen = computed(() => (browser.isFullscreen ? exitFullscreen : enterFullscreen))
</script>

<template>
  <button class="btn" @click="toggleFullscreen">
    {{ browser.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen' }}
  </button>
</template>
