const Label = ({ name, value }: { name: string; value: boolean }) => {
  console.log(`Label ${name} rendered`)

  return (
    <span
      className={`label ${value === true ? 'label--positive' : value === false ? 'label--negative' : 'label--unknown'}`}
    >
      {value === true ? 'Yes' : value === false ? 'No' : 'Unknown'}
    </span>
  )
}

export default Label
