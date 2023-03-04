import { FieldInputProps, FormikProps, FormikValues } from 'formik'
import React from 'react'

interface FormErrorProps {
  error: string | string[]
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  return (
    <>
      {Array.isArray(error) ? (
        error.map(errorItem => <div className="text-red-500 text-sm">{errorItem}</div>)
      ) : (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </>
  )
}

export default FormError
