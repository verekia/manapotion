<script lang="ts">
  import { browser, enterFullscreen, exitFullscreen } from '@manapotion/svelte'
</script>

<button on:click={$browser.isFullscreen ? exitFullscreen : enterFullscreen} class="btn">
  {$browser.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
</button>
