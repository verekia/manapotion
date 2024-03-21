import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'Canvas.tsx', 'hooks.ts'],
  splitting: false,
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  external: ['@react-three/fiber', 'react', 'react-dom', 'three'],
})
