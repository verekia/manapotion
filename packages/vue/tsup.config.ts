import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'Listeners.vue.ts'],
  splitting: false,
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
})
