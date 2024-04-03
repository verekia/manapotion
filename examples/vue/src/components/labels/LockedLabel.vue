<script setup lang="ts">
import { mouse } from '@manapotion/vue'

import Label from '../Label.vue'
</script>

<template>
  <Label :name="'locked'" :value="mouse.locked" />
</template>
