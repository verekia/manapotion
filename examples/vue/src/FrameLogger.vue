<script setup lang="ts">
import { onUnmounted } from 'vue'

import { useAnimationFrame } from '@manapotion/vue'

useAnimationFrame(() => {
  console.log('Frame!')
})

onUnmounted(() => {
  console.log('Unmounted!')
})
</script>

<template>Frame logger</template>
