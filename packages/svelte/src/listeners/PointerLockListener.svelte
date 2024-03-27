<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountPointerLockListener } from '@manapotion/core'

  import type { PointerLockChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ pointerLockChange: PointerLockChangePayload }>()

  onMount(() =>
    mountPointerLockListener({
      onPointerLockChange: payload => dispatch('pointerLockChange', payload),
    }),
  )
</script>
