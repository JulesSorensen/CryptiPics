import { FieldInputProps, FormikProps, FormikValues } from 'formik'

export const getError = ({ form, field }: { form?: FormikProps<FormikValues>; field?: FieldInputProps<any> }) => {
  return field && form && form.touched[field.name] ? (form.errors[field.name] as string | string[]) : undefined
}
