<script setup lang="ts">
import { computed } from 'vue'

import { lockPointer, mouse, unlockPointer } from '@manapotion/vue'

const toggleLocked = computed(() => (mouse.locked ? unlockPointer : lockPointer))
</script>

<template>
  <button class="btn" @click="toggleLocked">
    {{ mouse.locked ? 'Unlock' : 'Lock' }}
  </button>
</template>
