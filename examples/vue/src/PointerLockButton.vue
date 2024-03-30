<script setup lang="ts">
import { onBeforeUpdate } from 'vue'

import { lockPointer, mouse, unlockPointer } from '@manapotion/vue'

onBeforeUpdate(() => {
  console.log('PointerLockButton re-render ')
})
</script>

<template>
  <button @click="mouse.locked ? unlockPointer() : lockPointer()">
    {{ mouse.locked ? 'Unlock' : 'Lock' }} pointer
  </button>
</template>
