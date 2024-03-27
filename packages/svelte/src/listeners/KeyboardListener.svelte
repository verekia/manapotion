<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { KeyDownPayload, KeyUpPayload, mountKeyboardListener } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ keyDown: KeyDownPayload; keyUp: KeyUpPayload }>()

  onMount(() =>
    mountKeyboardListener({
      onKeyDown: payload => dispatch('keyDown', payload),
      onKeyUp: payload => dispatch('keyUp', payload),
    }),
  )
</script>
