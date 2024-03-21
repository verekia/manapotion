import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'Listeners.tsx', 'hooks.ts', 'store.ts'],
  splitting: false,
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react'],
})
