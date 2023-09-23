import { useState } from 'react'

const useFormField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useField = (fieldType, name) => {
  const field = useFormField(fieldType)
  const { type, value, onChange } = field
  let props = { type, value, onChange }
  if (name) props.name = name
  const reset = field.reset

  return {
    props,
    reset
  }
}