<script setup lang="ts">
import { browser } from '@manapotion/vue'

import Label from '../Label.vue'
</script>

<template>
  <Label :name="'isPageVisible'" :value="browser.isPageVisible" />
</template>
