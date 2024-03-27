<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountPointerLockListener, PointerLockChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ pointerLockChange: PointerLockChangePayload }>()

  onMount(() =>
    mountPointerLockListener({
      onPointerLockChange: payload => dispatch('pointerLockChange', payload),
    }),
  )
</script>
