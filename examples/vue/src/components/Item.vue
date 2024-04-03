<script setup lang="ts">
const props = defineProps({
  isReactive: { type: Boolean, default: true },
  name: { type: String, required: true },
})
</script>

<template>
  <div class="item">
    <span>{{ props.isReactive ? '⚡️' : '🗿' }}</span>
    <span class="item--main">
      <span class="item--name">{{ props.name }}</span>
      <span>
        <slot name="label" />
        <slot name="value" />
      </span>
    </span>
    <slot name="extra" />
  </div>
</template>
