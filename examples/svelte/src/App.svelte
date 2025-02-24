<script lang="ts">
  import { onMount } from 'svelte'

  import {
    DeviceTypeListener,
    Listeners,
    lockKeys,
    lockOrientation,
    pauseMainLoop,
    resumeMainLoop,
    unlockKeys,
    unlockOrientation,
    useMainLoop,
  } from '@manapotion/svelte'
  import { writable } from 'svelte/store'

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
  import KeyboardSection from './components/labels/KeyboardSection.svelte'
  import LeftMouseButtonLabel from './components/labels/LeftMouseButtonLabel.svelte'
  import LockedLabel from './components/labels/LockedLabel.svelte'
  import LockMouseButton from './components/labels/LockMouseButton.svelte'
  import MiddleMouseButtonLabel from './components/labels/MiddleMouseButtonLabel.svelte'
  import RightMouseButtonLabel from './components/labels/RightMouseButtonLabel.svelte'
  import MobileJoystick from './components/MobileJoystick.svelte'
  import TwitterIcon from './components/TwitterIcon.svelte'

  const handleDTChange = ({ detail }: CustomEvent<DeviceTypeChangePayload>) => {
    console.log('Device type change:', { isDesktop: detail.isDesktop, isMobile: detail.isMobile })
  }

  let windowSizeEl: HTMLSpanElement
  let mousePosEl: HTMLSpanElement
  let mouseMoveEl: HTMLSpanElement
  let scrollYEl: HTMLSpanElement
  let mainLoopEl: HTMLSpanElement
  let mainLoopThrottledEl: HTMLSpanElement

  let counter = 0

  onMount(() => {
    const interval = setInterval(() => {
      counter++
    }, 1000)

    return () => clearInterval(interval)
  })

  useMainLoop(({ callbackCount, delta, time, timeRunning }) => {
    mainLoopEl.innerHTML = `Delta (s): ${String(Math.round(delta * 1000) / 1000)}<br />Time (ms): ${String(Math.round(time))}<br />Time running (ms): ${String(Math.round(timeRunning))}<br />Counter: ${counter}<br />CBs: ${callbackCount}`
  })

  useMainLoop(
    ({ callbackCount, delta, time, timeRunning }) => {
      mainLoopThrottledEl.innerHTML = `Delta (s): ${String(Math.round(delta * 1000) / 1000)}<br />Time (ms): ${String(Math.round(time))}<br />Time running (ms): ${String(Math.round(timeRunning))}<br />Counter: ${counter}<br />CBs: ${callbackCount}`
    },
    { throttle: 100 },
  )

  const joystickMode = writable<'follow' | 'origin'>('follow')
</script>

<main class="mx-auto max-w-7xl px-5 pb-16 pt-5" on:contextmenu={e => e.preventDefault()}>
  <div class="mb-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
    <a href="/">
      <img src="/mana-potion.webp" class="w-28" alt="Logo" width="324" height="460" />
    </a>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3 justify-center sm:justify-start">
        <h1 class="text-5xl font-medium"><a href="/">Mana Potion</a></h1>
        <img src="/svelte.svg" class="size-10" alt="Svelte" />
      </div>
      <h2 class="max-w-lg text-pretty text-center text-lg text-gray-300 sm:text-left">
        Toolkit for JavaScript game development and interactive experiences with <a
          class="underline"
          href="/react/">React</a
        >, <a class="underline" href="/vue/">Vue</a>,
        <b>Svelte</b>, and <a class="underline" href="/vanilla/">vanilla JS</a>
        support.
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
      ⚡️ <b>Reactive</b> (subscribed components react to changes)
    </div>
    <div>
      🗿 <b>Non-reactive</b> (managed by events or the main loop)
    </div>
  </div>

  <div class="cols-1 mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
    <section>
      <h2 class="section-heading">🌐 Browser</h2>
      <Item name="isFullscreen">
        <IsFullscreenLabel slot="label" />
        <FullscreenButton slot="extra" />
      </Item>
      <Item name="isPageVisible">
        <IsPageVisibleLabel slot="label" />
      </Item>
      <Item name="isPageFocused">
        <IsPageFocusedLabel slot="label" />
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
      <Item name="width,height" isReactive={false}>
        <svelte:fragment slot="value">
          <span class="tabular-nums" bind:this={windowSizeEl} />
        </svelte:fragment>
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
    <section>
      <h2 class="section-heading">🖱️ Mouse</h2>
      <Item name="locked">
        <LockedLabel slot="label" />
        <LockMouseButton slot="extra" />
      </Item>
      <Item name="buttons.left">
        <LeftMouseButtonLabel slot="label" />
      </Item>
      <Item name="buttons.middle">
        <MiddleMouseButtonLabel slot="label" />
      </Item>
      <Item name="buttons.right">
        <RightMouseButtonLabel slot="label" />
      </Item>
      <Item name="position" isReactive={false}>
        <svelte:fragment slot="value">
          <span class="tabular-nums" bind:this={mousePosEl} />
        </svelte:fragment>
      </Item>
      <Item name="movement" isReactive={false}>
        <svelte:fragment slot="value">
          <span class="tabular-nums" bind:this={mouseMoveEl} />
        </svelte:fragment>
      </Item>
      <Item name="wheel.y" isReactive={false}>
        <svelte:fragment slot="value">
          <span class="tabular-nums" bind:this={scrollYEl} />
        </svelte:fragment>
      </Item>
    </section>
    <section>
      <h2 class="section-heading">⌨️ Keyboard</h2>
      <KeyboardSection />
    </section>
    <section>
      <h2 class="section-heading">🕹️ Virtual joysticks</h2>
      <div class="relative w-max">
        <div class="absolute left-[58px] top-[75px] max-w-36 text-center mobile:hidden">
          Switch to 👆 mobile mode in devtools
        </div>
        <MobileJoystick mode={$joystickMode} />
        <div class="mt-3 flex items-center justify-center gap-3">
          Mode
          <button
            class="btn capitalize"
            on:click={() => ($joystickMode = $joystickMode === 'follow' ? 'origin' : 'follow')}
          >
            {$joystickMode === 'follow' ? 'Follow' : 'Origin'}
          </button>
        </div>
      </div>
    </section>
    <section>
      <h2 class="section-heading">🔄 Main loop</h2>
      <div>
        <div><b>useMainLoop</b></div>
        <div class="tabular-nums" bind:this={mainLoopEl} />
      </div>
      <div>
        <div><b>useMainLoop (throttled)</b></div>
        <div class="tabular-nums" bind:this={mainLoopThrottledEl} />
      </div>
    </section>
    <section>
      <h2 class="section-heading">🍃 Tailwind</h2>
      <div>
        <div>
          Current width range:
          <span class="hidden max-5xs:inline">5xs and below</span>
          <span class="hidden 5xs:max-4xs:inline">5xs to 4xs</span>
          <span class="hidden 4xs:max-3xs:inline">4xs to 3xs</span>
          <span class="hidden 3xs:max-2xs:inline">3xs to 2xs</span>
          <span class="hidden 2xs:max-xs:inline">2xs to xs</span>
          <span class="hidden xs:max-sm:inline">xs to sm</span>
          <span class="hidden sm:max-md:inline">sm to md</span>
          <span class="hidden md:max-lg:inline">md to lg</span>
          <span class="hidden lg:max-xl:inline">lg to xl</span>
          <span class="hidden xl:max-2xl:inline">xl to 2xl</span>
          <span class="hidden 2xl:max-3xl:inline">2xl to 3xl</span>
          <span class="hidden 3xl:max-4xl:inline">3xl to 4xl</span>
          <span class="hidden 4xl:max-5xl:inline">4xl to 5xl</span>
          <span class="hidden 5xl:inline">5xl and up</span>
        </div>
        <div>
          Current height range:
          <span class="hidden max-5xs-h:inline">5xs and below</span>
          <span class="hidden 5xs-h:max-4xs-h:inline">5xs to 4xs</span>
          <span class="hidden 4xs-h:max-3xs-h:inline">4xs to 3xs</span>
          <span class="hidden 3xs-h:max-2xs-h:inline">3xs to 2xs</span>
          <span class="hidden 2xs-h:max-xs-h:inline">2xs to xs</span>
          <span class="hidden xs-h:max-sm-h:inline">xs to sm</span>
          <span class="hidden sm-h:max-md-h:inline">sm to md</span>
          <span class="hidden md-h:max-lg-h:inline">md to lg</span>
          <span class="hidden lg-h:max-xl-h:inline">lg to xl</span>
          <span class="hidden xl-h:max-2xl-h:inline">xl to 2xl</span>
          <span class="hidden 2xl-h:max-3xl-h:inline">2xl to 3xl</span>
          <span class="hidden 3xl-h:max-4xl-h:inline">3xl to 4xl</span>
          <span class="hidden 4xl-h:max-5xl-h:inline">4xl to 5xl</span>
          <span class="hidden 5xl-h:inline">5xl and up</span>
        </div>
      </div>
    </section>
  </div>

  <DeviceTypeListener on:deviceTypeChange={handleDTChange} />
  <Listeners
    on:keyDown={e => console.log(e.detail)}
    on:resize={e => (windowSizeEl.textContent = `${e.detail.width}x${e.detail.height}`)}
    on:mouseMove={e => {
      mousePosEl.textContent = `${e.detail.position.x} ${e.detail.position.y}`
      mouseMoveEl.textContent = `${e.detail.movement.x} ${e.detail.movement.y}`
    }}
    on:scroll={e => (scrollYEl.textContent = String(Math.round(e.detail.y)))}
    on:pageVisibilityChange={e => (e.detail.isPageVisible ? resumeMainLoop() : pauseMainLoop())}
  />
</main>
