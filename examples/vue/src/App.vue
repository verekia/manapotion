<script setup lang="ts">
import { ref } from 'vue'

import {
  Listeners,
  lockKeys,
  lockOrientation,
  throttle,
  unlockKeys,
  unlockOrientation,
  useAnimationFrame,
} from '@manapotion/vue'

import DiscordIcon from './components/DiscordIcon.vue'
import GithubIcon from './components/GithubIcon.vue'
import Item from './components/Item.vue'
import FullscreenButton from './components/labels/FullscreenButton.vue'
import IsDesktopLabel from './components/labels/IsDesktopLabel.vue'
import IsFullscreenLabel from './components/labels/IsFullscreenLabel.vue'
import IsLandscapeLabel from './components/labels/IsLandscapeLabel.vue'
import IsMobileLabel from './components/labels/IsMobileLabel.vue'
import IsPageFocusedLabel from './components/labels/IsPageFocusedLabel.vue'
import IsPageVisibleLabel from './components/labels/IsPageVisibleLabel.vue'
import IsPortraitLabel from './components/labels/IsPortraitLabel.vue'
import KeyboardSection from './components/labels/KeyboardSection.vue'
import LeftMouseButtonLabel from './components/labels/LeftMouseButtonLabel.vue'
import LockedLabel from './components/labels/LockedLabel.vue'
import LockMouseButton from './components/labels/LockMouseButton.vue'
import MiddleMouseButtonLabel from './components/labels/MiddleMouseButtonLabel.vue'
import RightMouseButtonLabel from './components/labels/RightMouseButtonLabel.vue'
import TwitterIcon from './components/TwitterIcon.vue'

const animationFrameEl = ref<HTMLSpanElement>()
const animationFrameThrottledEl = ref<HTMLSpanElement>()
const windowSizeEl = ref<HTMLSpanElement>()
const mousePosEl = ref<HTMLSpanElement>()
const mouseMoveEl = ref<HTMLSpanElement>()
const scrollYEl = ref<HTMLSpanElement>()

useAnimationFrame(({ elapsed }) => {
  animationFrameEl.value!.textContent = String(elapsed)
})

useAnimationFrame(
  throttle(({ elapsed }) => {
    animationFrameThrottledEl.value!.textContent = String(elapsed)
  }, 100),
)
</script>

<template>
  <main class="mx-auto max-w-7xl px-5 pb-16 pt-5" @contextmenu.prevent="">
    <div class="mb-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
      <img src="/mana-potion.webp" class="w-28" alt="Logo" />
      <div class="flex flex-col gap-3">
        <h1 class="text-center text-5xl font-medium sm:text-left">Mana Potion</h1>
        <h2 class="max-w-lg text-pretty text-center text-lg text-gray-200 sm:text-left">
          Toolkit for JavaScript game development and interactive experiences with
          <a class="underline" href="https://manapotion.org">React</a>, <b>Vue</b>,
          <a class="underline" href="https://svelte.manapotion.org">Svelte</a>, and
          <a class="underline" href="https://vanilla.manapotion.org">vanilla JS</a>
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

    <div class="mt-10 text-gray-200">
      <div>⚡️ <b>Reactive</b> (subscribed components react to changes)</div>
      <div>🗿 <b>Non-reactive</b> (managed by events or animation frame)</div>
    </div>

    <div class="cols-1 mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <section>
        <h2 class="section-heading">🌐 Browser</h2>
        <Item name="isFullscreen">
          <template #label>
            <IsFullscreenLabel />
          </template>
          <template #extra>
            <FullscreenButton />
          </template>
        </Item>
        <Item name="isPageVisible">
          <template #label>
            <IsPageVisibleLabel />
          </template>
        </Item>
        <Item name="isPageFocused">
          <template #label>
            <IsPageFocusedLabel />
          </template>
        </Item>

        <Item name="isDesktop">
          <template #label>
            <IsDesktopLabel />
          </template>
        </Item>
        <Item name="isMobile">
          <template #label>
            <IsMobileLabel />
          </template>
        </Item>

        <Item name="isPortrait">
          <template #label>
            <IsPortraitLabel />
          </template>
          <template #extra><span className="text-sm">Ratio-based</span></template>
        </Item>
        <Item name="isLandscape">
          <template #label>
            <IsLandscapeLabel />
          </template>
          <template #extra><span className="text-sm">Ratio-based</span></template>
        </Item>

        <Item :name="'width,height'" :is-reactive="false">
          <template #value>
            <span ref="windowSizeEl" class="tabular-nums" />
          </template>
        </Item>
        <div class="mt-2">
          <h2>Force mobile orientation (use after fullscreen)</h2>
          <div class="flex flex-wrap gap-2">
            <button class="btn" @click="() => lockOrientation('landscape')">Landscape</button>
            <button class="btn" @click="() => lockOrientation('portrait')">Portrait</button>
            <button class="btn" @click="unlockOrientation">Unlock orientation</button>
          </div>
        </div>
        <div class="mt-2">
          <h2>Keyboard lock (use after fullscreen on desktop)</h2>
          <div class="flex flex-wrap gap-2">
            <button class="btn" @click="() => lockKeys(['Escape', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])">
              Lock Esc and WASD
            </button>
            <button class="btn" @click="unlockKeys">Release keys</button>
          </div>
        </div>
      </section>
      <section>
        <h2 class="section-heading">🖱️ Mouse</h2>
        <Item name="locked">
          <template #label>
            <LockedLabel />
          </template>
          <template #extra>
            <LockMouseButton />
          </template>
        </Item>
        <Item name="buttons.left">
          <template #label>
            <LeftMouseButtonLabel />
          </template>
        </Item>
        <Item name="buttons.middle">
          <template #label>
            <MiddleMouseButtonLabel />
          </template>
        </Item>
        <Item name="buttons.right">
          <template #label>
            <RightMouseButtonLabel />
          </template>
        </Item>

        <Item name="position" :is-reactive="false">
          <template #value>
            <span ref="mousePosEl" class="tabular-nums" />
          </template>
        </Item>
        <Item name="movement" :is-reactive="false">
          <template #value>
            <span ref="mouseMoveEl" class="tabular-nums" />
          </template>
        </Item>
        <Item name="wheel.y" :is-reactive="false">
          <template #value>
            <span ref="scrollYEl" class="tabular-nums" />
          </template>
        </Item>
      </section>
      <section>
        <h2 class="section-heading">⌨️ Keyboard</h2>
        <KeyboardSection />
      </section>
      <section>
        <h2 class="section-heading">🕹️ Virtual joysticks</h2>
        <div>Vue support coming soon.</div>
      </section>
      <section>
        <h2 class="section-heading">🔄 Animation loops</h2>
        <div>useAnimationFrame: <span ref="animationFrameEl" class="tabular-nums" /></div>
        <div>
          useAnimationFrame (throttled):
          <span ref="animationFrameThrottledEl" class="tabular-nums" />
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
    <Listeners
      @resize="e => (windowSizeEl!.textContent = `${e.width}x${e.height}`)"
      @mouse-move="
        ({ position, movement }) => {
          mousePosEl!.textContent = `${position.x} ${position.y}`
          mouseMoveEl!.textContent = `${movement.x} ${movement.y}`
        }
      "
      @scroll="e => (scrollYEl!.textContent = String(Math.round(e.y)))"
    />
  </main>
</template>
