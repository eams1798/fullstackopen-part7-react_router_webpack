import { useState, useEffect } from "react"
import axios from "axios"
import { v4 as uuid4 } from "uuid"

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = (resource) => {
    const newResource = {
      ...resource,
      id: uuid4()
    }
    axios
      .post(baseUrl, newResource)
      .then((response) => {
        setResources([...resources, response.data])
      })
  }

  const update = (id, resource) => {
    axios
      .put(`${baseUrl}/${id}`, resource)
      .then((response) => {
        setResources(resources.map((resource) => resource.id === id ? response.data : resource))
      })
  }

  const remove = (id) => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then(() => {
        setResources(resources.filter((resource) => resource.id !== id))
      })
  }

  const service = {
    create, update, remove
  }

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setResources(response.data)
      })
  }, [baseUrl])

  return [
    resources, service
  ]
}
