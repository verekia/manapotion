const xxxxxs = '192px'
const xxxxs = '256px'
const xxxs = '320px'
const xxs = '384px'
const xs = '512px'
const sm = '640px' // TW
const md = '768px' // TW
const lg = '1024px' // TW
const xl = '1280px' // TW
const xxl = '1536px' // TW
const xxxl = '1792px'
const xxxxl = '2048px'
const xxxxxl = '2560px'

const screens = {
  '5xs': xxxxxs,
  '4xs': xxxxs,
  '3xs': xxxs,
  '2xs': xxs,
  xs,
  sm,
  md,
  lg,
  xl,
  '2xl': xxl,
  '3xl': xxxl,
  '4xl': xxxxl,
  '5xl': xxxxxl,
}

const extendScreens = {
  // https://github.com/tailwindlabs/tailwindcss/issues/13022

  'max-5xs': { raw: `not all and (min-width: ${xxxxxs})` },
  'max-4xs': { raw: `not all and (min-width: ${xxxxs})` },
  'max-3xs': { raw: `not all and (min-width: ${xxxs})` },
  'max-2xs': { raw: `not all and (min-width: ${xxs})` },
  'max-xs': { raw: `not all and (min-width: ${xs})` },
  'max-sm': { raw: `not all and (min-width: ${sm})` },
  'max-md': { raw: `not all and (min-width: ${md})` },
  'max-lg': { raw: `not all and (min-width: ${lg})` },
  'max-xl': { raw: `not all and (min-width: ${xl})` },
  'max-2xl': { raw: `not all and (min-width: ${xxl})` },
  'max-3xl': { raw: `not all and (min-width: ${xxxl})` },
  'max-4xl': { raw: `not all and (min-width: ${xxxxl})` },
  'max-5xl': { raw: `not all and (min-width: ${xxxxxl})` },

  '5xs-h': { raw: `(min-height: ${xxxxxs})` },
  '4xs-h': { raw: `(min-height: ${xxxxs})` },
  '3xs-h': { raw: `(min-height: ${xxxs})` },
  '2xs-h': { raw: `(min-height: ${xxs})` },
  'xs-h': { raw: `(min-height: ${xs})` },
  'sm-h': { raw: `(min-height: ${sm})` },
  'md-h': { raw: `(min-height: ${md})` },
  'lg-h': { raw: `(min-height: ${lg})` },
  'xl-h': { raw: `(min-height: ${xl})` },
  '2xl-h': { raw: `(min-height: ${xxl})` },
  '3xl-h': { raw: `(min-height: ${xxxl})` },
  '4xl-h': { raw: `(min-height: ${xxxxl})` },
  '5xl-h': { raw: `(min-height: ${xxxxxl})` },

  'max-5xs-h': { raw: `not all and (min-height: ${xxxxxs})` },
  'max-4xs-h': { raw: `not all and (min-height: ${xxxxs})` },
  'max-3xs-h': { raw: `not all and (min-height: ${xxxs})` },
  'max-2xs-h': { raw: `not all and (min-height: ${xxs})` },
  'max-xs-h': { raw: `not all and (min-height: ${xs})` },
  'max-sm-h': { raw: `not all and (min-height: ${sm})` },
  'max-md-h': { raw: `not all and (min-height: ${md})` },
  'max-lg-h': { raw: `not all and (min-height: ${lg})` },
  'max-xl-h': { raw: `not all and (min-height: ${xl})` },
  'max-2xl-h': { raw: `not all and (min-height: ${xxl})` },
  'max-3xl-h': { raw: `not all and (min-height: ${xxxl})` },
  'max-4xl-h': { raw: `not all and (min-height: ${xxxxl})` },
  'max-5xl-h': { raw: `not all and (min-height: ${xxxxxl})` },

  mobile: { raw: '(hover: none) and (pointer: coarse)' },
  desktop: { raw: '(hover: hover) and (pointer: fine)' },
}

export const tailwindTheme = { screens, extend: { screens: extendScreens } }
