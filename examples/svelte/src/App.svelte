<script lang="ts">
  import { DeviceTypeListener, FullscreenListener, useAnimationFrame } from '@manapotion/svelte'

  import type { DeviceTypeChangePayload } from '@manapotion/svelte'
  import Counter from './lib/Counter.svelte'

  useAnimationFrame(() => {
    console.log('Frame')
  })

  // const handleDTChange = ({ detail }: CustomEvent<DeviceTypeChangePayload>) => {
  //   console.log('Device type change:', { isDesktop: detail.isDesktop, isMobile: detail.isMobile })
  // }
</script>

<main>
  <h1>Svelte</h1>

  <div class="card mr-2">
    <Counter />
  </div>

  <!-- <DeviceTypeListener on:deviceTypeChange={handleDTChange} /> -->
  <FullscreenListener on:fullscreenChange={e => console.log(e.detail.isFullscreen)} />
</main>
