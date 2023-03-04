import React from 'react'
import { CustomFieldProps } from 'types/form.types'

interface RadioButtonProps extends CustomFieldProps {
  label: string
  value: any
  checked?: boolean
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  label,
  className = '',
  inputClassName = '',
  field,
  value,
  onChange,
  ...otherProps
}) => {
  const onValueChange = (value: any) => {
    if (field) {
      field.onChange(value)
    }

    if (onChange) {
      onChange(value)
    }
  }

  const checked = field ? field.value === value : otherProps.checked

  return (
    <label htmlFor={name} className={`flex items-center cursor-pointer px-4 py-2  ${className}`}>
      <input
        name={name}
        {...field}
        type="radio"
        className={`w-5 h-5 cursor-pointer ${inputClassName}`}
        value={value}
        onChange={onValueChange}
        checked={checked}
      />
      <span className="ml-2 text-gray-700 dark:text-gray-200">{label}</span>
    </label>
  )
}

export default RadioButton
