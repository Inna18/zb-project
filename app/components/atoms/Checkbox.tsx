import React from 'react'

type CheckboxProps = {
    value: string,
    id: string
}

const Checkbox = (checkboxProps: CheckboxProps) => {
  const { id, value } = checkboxProps;

  return (
    <input type="checkbox" id={id} value={value} />
  )
}

export default Checkbox
