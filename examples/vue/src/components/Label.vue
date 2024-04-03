<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ name: string; value: boolean }>()

console.log(`Label ${props.name} rendered`)

const labelClass = computed(() =>
  props.value === true
    ? 'label--positive'
    : props.value === false
      ? 'label--negative'
      : 'label--unknown',
)
const labelText = computed(() =>
  props.value === true ? 'Yes' : props.value === false ? 'No' : 'Unknown',
)
</script>

<template>
  <span :class="`label ${labelClass}`">
    {{ labelText }}
  </span>
</template>
