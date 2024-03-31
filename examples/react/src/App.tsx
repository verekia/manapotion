import { ForwardedRef, forwardRef, RefObject, useImperativeHandle, useRef, useState } from 'react'

import {
  debounce,
  Listeners,
  lockKeys,
  lockOrientation,
  resetKeyboard,
  resetMouse,
  throttle,
  throttleDebounce,
  unlockKeys,
  unlockOrientation,
  useAnimationFrame,
  useKeyboard,
} from '@manapotion/r3f'

import {
  FullscreenButton,
  FullscreenLabel,
  IsDesktopLabel,
  IsLandscapeLabel,
  IsMobileLabel,
  IsPortraitLabel,
  PageFocusLabel,
  PageVisibilityLabel,
} from './components/browser-labels'
import Item from './components/Item'
import Label from './components/Label'
import {
  LeftMouseButtonDownLabel,
  MiddleMouseButtonDownLabel,
  MouseLockedLabel,
  PointerLockButton,
  RightMouseButtonDownLabel,
} from './components/mouse-labels'
import MobileJoystick from './MobileJoystick'

export const throttledHello = throttle((...args) => console.log('throttledHello', ...args), 1000)
export const debouncedHello = debounce((...args) => console.log('debouncedHello', ...args), 1000)
export const throttledDebouncedHello = throttleDebounce(
  (...args) => console.log('throttledDebouncedHello', ...args),
  1000,
)

interface EventNotificationActions {
  setMessage: (message: string) => void
}

const EventNotificationBase = (_: unknown, ref: ForwardedRef<EventNotificationActions>) => {
  const messageRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useImperativeHandle(ref, () => ({
    setMessage: (message: string) => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      messageRef.current!.textContent = message
      hideTimeoutRef.current = setTimeout(() => {
        messageRef.current!.textContent = ''
      }, 2000)
    },
  }))

  return (
    <div className="fixed bottom-3 right-3 w-full max-w-lg rounded-lg border p-4">
      <div>Events:</div>
      <div ref={messageRef} />
    </div>
  )
}

const EventNotification = forwardRef(EventNotificationBase)

const KeyboardSection = () => {
  const keyboard = useKeyboard()

  const codes = Array.from(Object.keys(keyboard.codes)).reduce(
    (acc, code) => `${acc}${acc && ','} ${code}`,
    '',
  )
  const keys = Array.from(Object.keys(keyboard.keys)).reduce(
    (acc, key) => `${acc}${acc && ','} ${key}`,
    '',
  )

  return (
    <>
      <Item name="codes" value={codes} />
      <Item name="keys" value={keys} />
      <Item name="ctrl" label={<Label name="ctrl" value={keyboard.ctrl} />} />
      <Item name="shift" label={<Label name="shift" value={keyboard.shift} />} />
      <Item name="alt" label={<Label name="alt" value={keyboard.alt} />} />
      <Item name="meta" label={<Label name="meta" value={keyboard.meta} />} />
    </>
  )
}

const UI = ({
  liveMouseXRef,
  liveMouseYRef,
  liveMouseMovementXRef,
  liveMouseMovementYRef,
  liveWidthRef,
  liveHeightRef,
  liveScrollYRef,
}: {
  liveMouseXRef: RefObject<HTMLSpanElement>
  liveMouseYRef: RefObject<HTMLSpanElement>
  liveMouseMovementXRef: RefObject<HTMLSpanElement>
  liveMouseMovementYRef: RefObject<HTMLSpanElement>
  liveWidthRef: RefObject<HTMLSpanElement>
  liveHeightRef: RefObject<HTMLSpanElement>
  liveScrollYRef: RefObject<HTMLDivElement>
}) => {
  const animationFrameRef = useRef<HTMLSpanElement>(null)
  const animationFrameThrottledRef = useRef<HTMLSpanElement>(null)
  const [joystickMode, setJoystickMode] = useState<'follow' | 'origin'>('follow')

  useAnimationFrame(({ elapsed }) => {
    animationFrameRef.current!.textContent = String(elapsed)
  })

  useAnimationFrame(
    throttle(({ elapsed }) => {
      animationFrameThrottledRef.current!.textContent = String(elapsed)
    }, 100),
  )

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-5" onContextMenu={e => e.preventDefault()}>
        <div className="mb-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <img src="/mana-potion.webp" className="w-28" alt="Logo" />
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-5xl font-medium sm:text-left">Mana Potion</h1>
            <h2 className="max-w-lg text-pretty text-center text-lg text-gray-300 sm:text-left">
              Toolkit for JavaScript game development and interactive experiences (React, Vue,
              Svelte, vanilla)
            </h2>
            <div>
              <div className="text-center italic text-gray-400 sm:text-left">
                ⚡️ Reactive (re-render components on change)
              </div>
              <div className="text-center italic text-gray-400 sm:text-left">
                🗿 Non-reactive (managed by events or animation frame)
              </div>
            </div>
            <div>
              <a href="https://github.com/verekia/manapotion" target="_blank">
                GitHub
              </a>
              <span className="mx-1">•</span>
              <a href="https://twitter.com/verekia" target="_blank">
                Twitter
              </a>
              <span className="mx-1">•</span>
              <a href="https://discord.gg/VXYxGrP8EJ" target="_blank">
                Discord
              </a>
            </div>
          </div>
        </div>

        <div className="cols-1 mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <section>
            <h2 className="section-heading">🌐 Browser</h2>
            <Item label={<FullscreenLabel />} name="isFullscreen" extra={<FullscreenButton />} />
            <Item label={<PageVisibilityLabel />} name="isPageVisible" />
            <Item label={<PageFocusLabel />} name="isPageFocused" />
            <Item label={<IsDesktopLabel />} name="isDesktop" />
            <Item label={<IsMobileLabel />} name="isMobile" />
            <Item
              label={<IsPortraitLabel />}
              name="isPortrait"
              extra={<span className="text-sm">Ratio-based</span>}
            />
            <Item
              label={<IsLandscapeLabel />}
              name="isLandscape"
              extra={<span className="text-sm">Ratio-based</span>}
            />
            <Item
              isReactive={false}
              name="width,height"
              value={
                <>
                  <span ref={liveWidthRef} />x<span ref={liveHeightRef} />
                </>
              }
            />
            <div className="mt-2">
              <h2>Force mobile orientation (use after fullscreen)</h2>
              <div className="flex flex-wrap gap-2">
                <button className="btn" onClick={() => lockOrientation('landscape')}>
                  Landscape
                </button>
                <button className="btn" onClick={() => lockOrientation('portrait')}>
                  Portrait
                </button>
                <button className="btn" onClick={unlockOrientation}>
                  Unlock orientation
                </button>
              </div>
            </div>
            <div className="mt-2">
              <h2>Keyboard lock (use after fullscreen on desktop)</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  className="btn"
                  onClick={() => lockKeys(['Escape', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])}
                >
                  Lock Esc and WASD
                </button>
                <button className="btn" onClick={() => unlockKeys()}>
                  Release keys
                </button>
              </div>
            </div>
          </section>
          <section>
            <h2 className="section-heading">🖱️ Mouse</h2>
            <Item label={<MouseLockedLabel />} name="locked" extra={<PointerLockButton />} />
            <Item label={<LeftMouseButtonDownLabel />} name="buttons.left" />
            <Item label={<MiddleMouseButtonDownLabel />} name="buttons.middle" />
            <Item label={<RightMouseButtonDownLabel />} name="buttons.right" />
            <Item
              isReactive={false}
              name="position"
              value={
                <>
                  <span className="tabular-nums" ref={liveMouseXRef} />{' '}
                  <span className="tabular-nums" ref={liveMouseYRef} />
                </>
              }
            />
            <Item
              isReactive={false}
              name="movement"
              value={
                <>
                  <span className="tabular-nums" ref={liveMouseMovementXRef} />{' '}
                  <span className="tabular-nums" ref={liveMouseMovementYRef} />
                </>
              }
            />
            <Item
              isReactive={false}
              name="wheel.y"
              value={<span className="tabular-nums" ref={liveScrollYRef} />}
            />
          </section>
          <section>
            <h2 className="section-heading">🕹️ Virtual joysticks</h2>
            <div className="relative w-max">
              <div className="absolute left-10 top-20 max-w-36 text-center mobile:hidden">
                Switch to 👆 mobile mode in devtools
              </div>
              <MobileJoystick className="mt-3" mode={joystickMode} />
              <div className="mt-3 flex items-center justify-center gap-3">
                Mode{' '}
                <button
                  className="btn capitalize"
                  onClick={() => setJoystickMode(joystickMode === 'follow' ? 'origin' : 'follow')}
                >
                  {joystickMode}
                </button>
              </div>
            </div>
          </section>
          <section>
            <h2 className="section-heading">⌨️ Keyboard</h2>
            <KeyboardSection />
          </section>
          <section>
            <h2 className="section-heading">🔄 Animation loops</h2>
            <div>
              useAnimationFrame: <span className="tabular-nums" ref={animationFrameRef} />
            </div>
            <div>
              useAnimationFrame (throttled):{' '}
              <span className="tabular-nums" ref={animationFrameThrottledRef} />
            </div>
          </section>
          <section>
            <h2 className="section-heading">🍃 Tailwind</h2>
            <div>
              <div>
                Current width range:
                <span className="hidden max-5xs:inline">5xs and below</span>
                <span className="hidden 5xs:max-4xs:inline">5xs to 4xs</span>
                <span className="hidden 4xs:max-3xs:inline">4xs to 3xs</span>
                <span className="hidden 3xs:max-2xs:inline">3xs to 2xs</span>
                <span className="hidden 2xs:max-xs:inline">2xs to xs</span>
                <span className="hidden xs:max-sm:inline">xs to sm</span>
                <span className="hidden sm:max-md:inline">sm to md</span>
                <span className="hidden md:max-lg:inline">md to lg</span>
                <span className="hidden lg:max-xl:inline">lg to xl</span>
                <span className="hidden xl:max-2xl:inline">xl to 2xl</span>
                <span className="hidden 2xl:max-3xl:inline">2xl to 3xl</span>
                <span className="hidden 3xl:max-4xl:inline">3xl to 4xl</span>
                <span className="hidden 4xl:max-5xl:inline">4xl to 5xl</span>
                <span className="hidden 5xl:inline">5xl and up</span>
              </div>
              <div>
                Current height range:
                <span className="hidden max-5xs-h:inline">5xs and below</span>
                <span className="hidden 5xs-h:max-4xs-h:inline">5xs to 4xs</span>
                <span className="hidden 4xs-h:max-3xs-h:inline">4xs to 3xs</span>
                <span className="hidden 3xs-h:max-2xs-h:inline">3xs to 2xs</span>
                <span className="hidden 2xs-h:max-xs-h:inline">2xs to xs</span>
                <span className="hidden xs-h:max-sm-h:inline">xs to sm</span>
                <span className="hidden sm-h:max-md-h:inline">sm to md</span>
                <span className="hidden md-h:max-lg-h:inline">md to lg</span>
                <span className="hidden lg-h:max-xl-h:inline">lg to xl</span>
                <span className="hidden xl-h:max-2xl-h:inline">xl to 2xl</span>
                <span className="hidden 2xl-h:max-3xl-h:inline">2xl to 3xl</span>
                <span className="hidden 3xl-h:max-4xl-h:inline">3xl to 4xl</span>
                <span className="hidden 4xl-h:max-5xl-h:inline">4xl to 5xl</span>
                <span className="hidden 5xl-h:inline">5xl and up</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

const App = () => {
  const eventNotificationRef = useRef<EventNotificationActions>(null)
  const liveMouseXRef = useRef<HTMLSpanElement>(null)
  const liveMouseYRef = useRef<HTMLSpanElement>(null)
  const liveMouseMovementXRef = useRef<HTMLSpanElement>(null)
  const liveMouseMovementYRef = useRef<HTMLSpanElement>(null)
  const liveWidthRef = useRef<HTMLSpanElement>(null)
  const liveHeightRef = useRef<HTMLSpanElement>(null)
  const liveScrollYRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <UI
        liveMouseXRef={liveMouseXRef}
        liveMouseYRef={liveMouseYRef}
        liveMouseMovementXRef={liveMouseMovementXRef}
        liveMouseMovementYRef={liveMouseMovementYRef}
        liveWidthRef={liveWidthRef}
        liveHeightRef={liveHeightRef}
        liveScrollYRef={liveScrollYRef}
      />
      {false && <EventNotification ref={eventNotificationRef} />}
      <Listeners
        onPointerLockChange={isPointerLocked =>
          console.log(`onPointerLockChange – isPointerLocked: ${isPointerLocked}`)
        }
        onKeyDown={({ code, alt, ctrl, key, meta, shift }) =>
          console.log(
            `onKeydown – code: ${code}, key: ${key}, alt: ${alt}, ctrl: ${ctrl}, meta: ${meta}, shift: ${shift}`,
          )
        }
        onKeyUp={({ code, key }) => console.log(`onKeyup – code: ${code}, key: ${key}`)}
        onMouseMove={({ position, movement }) => {
          console.log(
            `onMouseMove – x: ${position.x}, y: ${position.y}, movementX: ${movement.x}, movementY: ${movement.y}`,
          )
          liveMouseXRef.current!.textContent = String(position.x)
          liveMouseYRef.current!.textContent = String(position.y)
          liveMouseMovementXRef.current!.textContent = String(movement.x)
          liveMouseMovementYRef.current!.textContent = String(movement.y)
        }}
        onDeviceTypeChange={({ isDesktop, isMobile }) =>
          console.log(`onDeviceTypeChange – isDesktop: ${isDesktop}, isMobile: ${isMobile}`)
        }
        onFullscreenChange={isFullscreen =>
          console.log(`onFullscreenChange – isFullscreen: ${isFullscreen}`)
        }
        onScreenOrientationChange={({ isPortrait, isLandscape }) =>
          console.log(
            `onScreenOrientationChange – isPortrait: ${isPortrait}, isLandscape: ${isLandscape}`,
          )
        }
        onLeftMouseButtonDown={() => console.log('onLeftMouseButtonDown')}
        onMiddleMouseButtonDown={() => console.log('onMiddleMouseButtonDown')}
        onRightMouseButtonDown={() => console.log('onRightMouseButtonDown')}
        onLeftMouseButtonUp={() => console.log('onLeftMouseButtonUp')}
        onMiddleMouseButtonUp={() => console.log('onMiddleMouseUp')}
        onRightMouseButtonUp={() => console.log('onRightMouseButtonUp')}
        onScroll={({ wheel }) => {
          const rounded = Math.round(wheel.y)
          console.log(`onScroll – deltaY: ${rounded}`)
          liveScrollYRef.current!.textContent = String(rounded)
        }}
        onPageFocusChange={() => {
          resetKeyboard()
          resetMouse()
        }}
        onPageVisibilityChange={() => {
          resetKeyboard()
          resetMouse()
        }}
        onResize={({ width, height }) => {
          console.log(`onResize – width: ${width}, height: ${height}`)
          liveWidthRef.current!.textContent = String(width)
          liveHeightRef.current!.textContent = String(height)
        }}
      />
    </>
  )
}

export default App
