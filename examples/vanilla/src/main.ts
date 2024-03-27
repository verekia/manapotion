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
  onMouseMove: ({ x, y }) => console.log('mouse moved', x, y),
})

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const unsub = startAnimationFrame(dt => console.log(dt))

setTimeout(() => {
  unsub()
}, 2000)
