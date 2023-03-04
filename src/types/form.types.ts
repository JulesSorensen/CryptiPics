import { FormikProps, FormikValues, FieldInputProps } from 'formik';

export interface CustomFieldProps {
  name?: string
  onChange?: (value: any) => void
  form?: FormikProps<FormikValues>
  field?: FieldInputProps<any>
  disabled?: boolean
  // classe à appliquer sur le champs
  className?: string
  // classe à appliquer sur un élement input
  inputClassName?: string
  style?: React.CSSProperties
}