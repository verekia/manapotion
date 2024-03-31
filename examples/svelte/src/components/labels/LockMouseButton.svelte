<script lang="ts">
  import { lockPointer, mouse, unlockPointer } from '@manapotion/svelte'
</script>

<button on:click={$mouse.locked ? unlockPointer : lockPointer} class="btn">
  {$mouse.locked ? 'Unlock' : 'Lock'}
</button>
