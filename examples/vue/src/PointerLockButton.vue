<script setup lang="ts">
// @ts-expect-error
import { onBeforeUpdate } from 'vue'
import { lockPointer, unlockPointer } from '@manapotion/browser'
// @ts-expect-error
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
