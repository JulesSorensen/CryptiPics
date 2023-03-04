import React from 'react'

interface FormLabelProps {
  name?: string
  className?: string
  children: React.ReactNode
}

const FormLabel: React.FC<FormLabelProps> = ({ children, name, className }) => {
  return (
    <label htmlFor={name} className={`block text-slate-600 dark:text-slate-300 text-sm ${className}`}>
      {children}
    </label>
  )
}

export default FormLabel
