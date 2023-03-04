import React from 'react'
import { CustomFieldProps } from 'types/form.types'
import ReactSwitch from 'react-switch'

interface SwitchProps extends CustomFieldProps {
  value?: boolean
  onChange?: (value: boolean) => void
  label?: string
}

const Switch: React.FC<SwitchProps> = ({ field, value, form, onChange, label }) => {
  const onValueChange = (newValue: boolean) => {
    if (onChange) {
      onChange(newValue)
    }

    if (form && field) {
      form.setFieldValue(field.name, newValue)
    }
  }
  const checked = field && field.value !== undefined ? field.value : value

  return (
    <label>
      {label && <span>{label}</span>}
      <ReactSwitch onChange={onValueChange} checked={checked} />
    </label>
  )
}

export default Switch
