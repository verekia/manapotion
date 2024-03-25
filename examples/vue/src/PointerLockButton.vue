<script setup lang="ts">
import { onBeforeUpdate } from 'vue'

import { isPointerLocked, lockPointer, unlockPointer } from '@manapotion/vue'

onBeforeUpdate(() => {
  console.log('PointerLockButton re-render ')
})
</script>

<template>
  <button @click="isPointerLocked ? unlockPointer() : lockPointer()">
    {{ isPointerLocked ? 'Unlock' : 'Lock' }} pointer
  </button>
</template>
