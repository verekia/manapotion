<script lang="ts">
  import {
    browser,
    DeviceTypeListener,
    getMouse,
    Listeners,
    useAnimationFrame,
  } from '@manapotion/svelte'

  import type { DeviceTypeChangePayload } from '@manapotion/svelte'

  let playerEl: HTMLDivElement
  let mouseXEl: HTMLSpanElement
  let mouseYEl: HTMLSpanElement
  let player = { x: 0, y: 0 }

  useAnimationFrame(() => {
    const mouse = getMouse()
    console.log('Frame')
    playerEl.style.transform = `translate(${player.x}px, ${player.y}px)`
    player.x += 1
    player.y += 1
    mouseXEl.textContent = mouse.position.x.toString()
    mouseYEl.textContent = mouse.position.y.toString()
  })

  const handleDTChange = ({ detail }: CustomEvent<DeviceTypeChangePayload>) => {
    console.log('Device type change:', { isDesktop: detail.isDesktop, isMobile: detail.isMobile })
  }
</script>

<main>
  <h1>Svelte</h1>

  <div class="card mr-2">
    Is desktop: {$browser.isDesktop ? 'Yes' : 'No'}
    Is fullscreen: {$browser.isFullscreen ? 'Yes' : 'No'}
    Is landscape: {$browser.isLandscape ? 'Yes' : 'No'}
    Is portrait: {$browser.isPortrait ? 'Yes' : 'No'}
    Mouse position: <span bind:this={mouseXEl} />, <span bind:this={mouseYEl} />
  </div>

  <div bind:this={playerEl}>Player</div>

  <DeviceTypeListener on:deviceTypeChange={handleDTChange} />
  <Listeners on:keyDown={e => console.log(e.detail)} />
</main>
