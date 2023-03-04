import Button from '@components/Button'
import Input from '@components/Fields/Input'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import FormLabel from '../FormsLayout/FormLabel'

export interface UpdatePasswordFields {
  currentPassword: string
  password: string
  confirmPassword: string
}

interface UpdatePasswordForm extends FormikProps<UpdatePasswordFields> {}

const UpdatePasswordForm: React.FC<UpdatePasswordForm> = ({ errors }) => {
  return (
    <Form className="w-full">
      <FormLabel>Mot de passe actuel</FormLabel>
      <Field name="currentPassword" type="password" component={Input} placeholder="Saisissez votre mot de passe" />

      <FormLabel className="mt-5">Nouveau mot de passe</FormLabel>
      <Field name="password" type="password" component={Input} placeholder="Saisir un nouveau mot de passe" />

      <FormLabel className="mt-5">Confirmer nouveau mot de passe</FormLabel>
      <Field
        name="confirmPassword"
        type="password"
        component={Input}
        placeholder="Confirmation du nouveau mot de passe"
      />

      <div className="flex justify-center mt-10">
        <Button type="submit" style={{ padding: '10px 30px' }}>
          Enregistrer
        </Button>
      </div>
    </Form>
  )
}

export default UpdatePasswordForm
