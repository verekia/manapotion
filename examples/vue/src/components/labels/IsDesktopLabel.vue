<script setup lang="ts">
import { browser } from '@manapotion/vue'

import Label from '../Label.vue'
</script>

<template>
  <Label :name="'isDesktop'" :value="browser.isDesktop" />
</template>
