<script lang="ts">
  import {
    DeviceTypeListener,
    Listeners,
    lockKeys,
    lockOrientation,
    unlockKeys,
    unlockOrientation,
  } from '@manapotion/svelte'

  import type { DeviceTypeChangePayload } from '@manapotion/svelte'

  import DiscordIcon from './components/DiscordIcon.svelte'
  import GithubIcon from './components/GithubIcon.svelte'
  import Item from './components/Item.svelte'
  import FullscreenButton from './components/labels/FullscreenButton.svelte'
  import IsDesktopLabel from './components/labels/IsDesktopLabel.svelte'
  import IsFullscreenLabel from './components/labels/IsFullscreenLabel.svelte'
  import IsLandscapeLabel from './components/labels/IsLandscapeLabel.svelte'
  import IsMobileLabel from './components/labels/IsMobileLabel.svelte'
  import IsPageFocusedLabel from './components/labels/IsPageFocusedLabel.svelte'
  import IsPageVisibleLabel from './components/labels/IsPageVisibleLabel.svelte'
  import IsPortraitLabel from './components/labels/IsPortraitLabel.svelte'
  import TwitterIcon from './components/TwitterIcon.svelte'

  const handleDTChange = ({ detail }: CustomEvent<DeviceTypeChangePayload>) => {
    console.log('Device type change:', { isDesktop: detail.isDesktop, isMobile: detail.isMobile })
  }
</script>

<main class="mx-auto max-w-7xl px-5 pb-16 pt-5" on:contextmenu={e => e.preventDefault()}>
  <div class="mb-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
    <img src="/mana-potion.webp" class="w-28" alt="Logo" />
    <div class="flex flex-col gap-3">
      <h1 class="text-center text-5xl font-medium sm:text-left">Mana Potion</h1>
      <h2 class="max-w-lg text-pretty text-center text-lg text-gray-300 sm:text-left">
        Toolkit for JavaScript game development and interactive experiences with React, Vue, <b
          >Svelte</b
        >, and vanilla JS support.
      </h2>
      <div class="flex items-center justify-center gap-3 sm:justify-start">
        <a
          href="https://github.com/verekia/manapotion"
          target="_blank"
          class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
        >
          <GithubIcon />
          GitHub
        </a>
        <a
          href="https://twitter.com/verekia"
          target="_blank"
          class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
        >
          <TwitterIcon />
          Twitter
        </a>
        <a
          href="https://discord.gg/VXYxGrP8EJ"
          target="_blank"
          class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
        >
          <DiscordIcon />
          Discord
        </a>
      </div>
    </div>
  </div>

  <div class="mt-10 text-gray-300">
    <div>
      ⚡️ <b>Reactive</b> (re-renders components on changes)
    </div>
    <div>
      🗿 <b>Non-reactive</b> (managed by events or animation frame)
    </div>
  </div>

  <div class="cols-1 mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
    <section>
      <h2 class="section-heading">🌐 Browser</h2>
      <Item name="isFullscreen">
        <IsFullscreenLabel slot="label" />
        <FullscreenButton slot="extra" />
      </Item>
      <Item name="isPageFocused">
        <IsPageFocusedLabel slot="label" />
      </Item>
      <Item name="isPageVisible">
        <IsPageVisibleLabel slot="label" />
      </Item>
      <Item name="isDesktop">
        <IsDesktopLabel slot="label" />
      </Item>
      <Item name="isMobile">
        <IsMobileLabel slot="label" />
      </Item>
      <Item name="isPortrait">
        <IsPortraitLabel slot="label" />
        <span slot="extra" class="text-sm">Ratio-based</span>
      </Item>
      <Item name="isLandscape">
        <IsLandscapeLabel slot="label" />
        <span slot="extra" class="text-sm">Ratio-based</span>
      </Item>
      <div class="mt-2">
        <h2>Force mobile orientation (use after fullscreen)</h2>
        <div class="flex flex-wrap gap-2">
          <button class="btn" on:click={() => lockOrientation('landscape')}> Landscape </button>
          <button class="btn" on:click={() => lockOrientation('portrait')}> Portrait </button>
          <button class="btn" on:click={unlockOrientation}> Unlock orientation </button>
        </div>
      </div>
      <div class="mt-2">
        <h2>Keyboard lock (use after fullscreen on desktop)</h2>
        <div class="flex flex-wrap gap-2">
          <button class="btn" on:click={() => lockKeys(['Escape', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])}>
            Lock Esc and WASD
          </button>
          <button class="btn" on:click={unlockKeys}> Release keys </button>
        </div>
      </div>
    </section>
  </div>

  <DeviceTypeListener on:deviceTypeChange={handleDTChange} />
  <Listeners on:keyDown={e => console.log(e.detail)} />
</main>
