import FormError from '@components/Forms/FormsLayout/FormError'
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { getError } from '@utils/form'
import { CustomFieldProps } from 'types/form.types'
import { FieldConfig } from 'formik'

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  placeholder?: string
  as?: string
  required?: boolean
  full?: boolean
  type?: string
  autocomplete?: string
  children?: any
  rows?: number
  maxLength?: number
}

const TextArea: React.FC<TextAreaProps & FieldConfig & CustomFieldProps> = ({
  name,
  placeholder,
  as,
  type,
  full = false,
  required = false,
  autocomplete,
  children,
  rows,
  maxLength,
  field,
  form,
  ...props
}) => {
  const error = getError({ form, field })
  return (
    <div className="relative w-full">
      <textarea
        className="relative w-full input resize-none"
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        {...props}
        {...field}
      />
      {error && <FormError error={error} />}
    </div>
  )
}

export default TextArea
