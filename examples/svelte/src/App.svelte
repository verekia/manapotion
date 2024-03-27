<script lang="ts">
  import { DeviceTypeListener, useAnimationFrame } from '@manapotion/svelte'

  import type { DeviceTypeChangePayload } from '@manapotion/svelte'
  import Counter from './lib/Counter.svelte'

  useAnimationFrame(() => {
    console.log('Frame')
  })

  const handleDTChange = ({ detail }: CustomEvent<DeviceTypeChangePayload>) => {
    console.log('Device type change:', { isDesktop: detail.isDesktop, isMobile: detail.isMobile })
  }
</script>

<main>
  <h1>Vite + Svelte</h1>

  <div class="card mr-2">
    <Counter />
  </div>

  <DeviceTypeListener on:deviceTypeChange={handleDTChange} />
</main>
