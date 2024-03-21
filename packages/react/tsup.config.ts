import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'Listeners.tsx', 'hooks.ts', 'store.ts', 'JoystickArea.tsx'],
  splitting: false,
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
})
