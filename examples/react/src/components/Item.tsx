import { ReactNode } from 'react'

const Item = ({
  isReactive = true,
  name,
  label,
  value,
  extra,
}: {
  isReactive?: boolean
  name: string
  value?: ReactNode
  label?: ReactNode
  extra?: ReactNode
}) => (
  <div className="item">
    <span>{isReactive ? '⚡️' : '🗿'}</span>
    <span className="item--main">
      <span className="item--name">{name}</span>
      <span>
        {label}
        {value}
      </span>
    </span>
    {extra}
  </div>
)

export default Item
