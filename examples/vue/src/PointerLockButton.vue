<script setup lang="ts">
import { onBeforeUpdate } from 'vue'
import { lockPointer, unlockPointer } from '@manapotion/browser'
import { isPointerLocked } from '@manapotion/vue'

onBeforeUpdate(() => {
  console.log('PointerLockButton re-render ')
})
</script>

<template>
  <button @click="isPointerLocked ? unlockPointer() : lockPointer()">
    {{ isPointerLocked ? 'Unlock' : 'Lock' }} pointer
  </button>
  
</template>
