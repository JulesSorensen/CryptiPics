import FormError from '@components/Forms/FormsLayout/FormError'
import { getError } from '@utils/form'
import classNames from 'classnames'
import React, { InputHTMLAttributes } from 'react'
import { CustomFieldProps } from 'types/form.types'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element
}

const Input: React.FC<InputProps & CustomFieldProps> = ({ className = '', icon, field, form, ...props }) => {
  const error = getError({ form, field })

  return (
    <div className="relative w-full">
      {icon && <div className="input-icon">{icon}</div>}
      <input
        type="text"
        className={classNames({
          input: true,
          'input-with-icon': icon,
          error,
          disabled: props.disabled,
          [className]: true
        })}
        {...props}
        {...field}
      />
      {error && <FormError error={error} />}
    </div>
  )
}

export default Input
