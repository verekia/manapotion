<script lang="ts">
  export let isReactive: boolean | undefined = true
  export let name: string | undefined
</script>

<div class="item">
  <span>{isReactive ? '⚡️' : '🗿'}</span>
  <span class="item--main">
    <span class="item--name">{name}</span>
    <span>
      <slot name="label" />
      <slot name="value" />
    </span>
  </span>
  <slot name="extra" />
</div>
