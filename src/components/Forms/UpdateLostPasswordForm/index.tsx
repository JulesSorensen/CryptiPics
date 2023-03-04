import Button from '@components/Button'
import Input from '@components/Fields/Input'
import { LockClosedIcon } from '@heroicons/react/outline'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'

export interface UpdateLostPasswordFields {
  password: string
  passwordConfirm: string
}

interface UpdateLostPasswordFormProps extends FormikProps<UpdateLostPasswordFields> {}

const UpdateLostPasswordForm: React.FC<UpdateLostPasswordFormProps> = ({}) => {
  return (
    <Form className="w-full">
      <Field
        name="password"
        placeholder="Nouveau mot de passe"
        type="password"
        component={Input}
        icon={<LockClosedIcon className="w-5 h-5" />}
      />
      <Field
        name="passwordConfirm"
        placeholder="Confirmer votre mot de passe"
        component={Input}
        icon={<LockClosedIcon className="w-5 h-5" />}
        type="password"
        className="mt-5"
      />

      <div className="flex justify-center mt-10">
        <Button type="submit" className="p-4 mx-5 w-full rounded-2xl">
          Soumettre
        </Button>
      </div>
    </Form>
  )
}

export default UpdateLostPasswordForm
