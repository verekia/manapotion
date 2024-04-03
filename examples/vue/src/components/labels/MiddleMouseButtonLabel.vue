<script setup lang="ts">
import { mouse } from '@manapotion/vue'

import Label from '../Label.vue'
</script>

<template>
  <Label :name="'buttons.middle'" :value="mouse.buttons.middle" />
</template>
