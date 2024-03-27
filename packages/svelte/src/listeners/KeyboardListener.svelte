<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountKeyboardListener } from '@manapotion/core'

  import type { KeyDownPayload, KeyUpPayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ keyDown: KeyDownPayload; keyUp: KeyUpPayload }>()

  onMount(() =>
    mountKeyboardListener({
      onKeyDown: payload => dispatch('keyDown', payload),
      onKeyUp: payload => dispatch('keyUp', payload),
    }),
  )
</script>
