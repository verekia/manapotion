<script lang="ts">
  import {
    DeviceTypeListener,
    isFullscreen,
    isPortrait,
    Listeners,
    mpStore,
    useAnimationFrame,
  } from '@manapotion/svelte'

  import type { DeviceTypeChangePayload } from '@manapotion/svelte'

  let playerEl: HTMLDivElement
  let player = { x: 0, y: 0 }

  useAnimationFrame(() => {
    console.log('Frame')
    playerEl.style.transform = `translate(${player.x}px, ${player.y}px)`
    player.x += 1
    player.y += 1
  })

  const handleDTChange = ({ detail }: CustomEvent<DeviceTypeChangePayload>) => {
    console.log('Device type change:', { isDesktop: detail.isDesktop, isMobile: detail.isMobile })
  }
</script>

<main>
  <h1>Svelte</h1>

  <div class="card mr-2">
    Is desktop: {$mpStore.isDesktop ? 'Yes' : 'No'}
    Is fullscreen: {$isFullscreen ? 'Yes' : 'No'}
    Is landscape: {$mpStore.isLandscape ? 'Yes' : 'No'}
    Is portrait: {$isPortrait ? 'Yes' : 'No'}
    Mouse position: {$mpStore.mouseX}, {$mpStore.mouseY}
  </div>

  <div bind:this={playerEl}>Player</div>

  <DeviceTypeListener on:deviceTypeChange={handleDTChange} />
  <Listeners on:keyDown={e => console.log(e.detail)} />
</main>
