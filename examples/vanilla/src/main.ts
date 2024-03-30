import { listeners, startAnimationFrame } from '@manapotion/vanilla'

import { setupCounter } from './counter.ts'

import './index.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

listeners({
  onMouseMove: ({ position }) => console.log('mouse moved', position.x, position.y),
})

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const unsub = startAnimationFrame(dt => console.log(dt))

setTimeout(() => {
  unsub()
}, 2000)
