<script lang="ts">
  import { mouse } from '@manapotion/svelte'

  import Label from '../Label.svelte'
</script>

<Label name="locked" value={$mouse.locked} />
