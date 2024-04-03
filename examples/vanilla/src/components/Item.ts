import html from '../html'

const Item = ({
  name,
  label,
  value,
  extra,
}: {
  name: string
  value?: string
  label?: string
  extra?: string
}) =>
  html`<div class="item">
    <span>🗿</span>
    <span class="item--main">
      <span class="item--name">${name}</span>
      <span>${label ?? ''}${value ?? ''}</span>
    </span>
    ${extra ?? ''}
  </div>`

export default Item
