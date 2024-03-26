<script lang="ts">
  import { useAnimationFrame } from '@manapotion/svelte'

  import Counter from './lib/Counter.svelte'

  useAnimationFrame(() => {
    console.log('Frame')
  })
</script>

<main>
  <h1>Vite + Svelte</h1>

  <div class="card mr-2">
    <Counter />
  </div>
</main>
