<script lang="ts">
  import { browser } from '@manapotion/svelte'

  import Label from '../Label.svelte'
</script>

<Label name="isFullscreen" value={$browser.isFullscreen} />
