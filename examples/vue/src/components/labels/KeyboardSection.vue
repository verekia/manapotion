<script setup lang="ts">
import { computed } from 'vue'

import { keyboard } from '@manapotion/vue'

import Item from '../Item.vue'
import Label from '../Label.vue'

const codes = computed(() =>
  Array.from(Object.keys(keyboard.codes)).reduce((acc, code) => `${acc}${acc && ','} ${code}`, ''),
)

const keys = computed(() =>
  Array.from(Object.keys(keyboard.keys)).reduce((acc, key) => `${acc}${acc && ','} ${key}`, ''),
)
</script>

<template>
  <Item name="codes">
    <template #label>
      {{ codes }}
    </template>
  </Item>

  <Item name="keys">
    <template #label>
      {{ keys }}
    </template>
  </Item>

  <Item name="ctrl">
    <template #label>
      <Label :name="'ctrl'" :value="keyboard.ctrl" />
    </template>
  </Item>

  <Item name="shift">
    <template #label>
      <Label :name="'shift'" :value="keyboard.shift" />
    </template>
  </Item>

  <Item name="alt">
    <template #label>
      <Label :name="'alt'" :value="keyboard.alt" />
    </template>
  </Item>

  <Item name="meta">
    <template #label>
      <Label :name="'meta'" :value="keyboard.meta" />
    </template>
  </Item>
</template>
