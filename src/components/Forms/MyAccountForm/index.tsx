import Button from '@components/Button'
import Input from '@components/Fields/Input'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import FormLabel from '../FormsLayout/FormLabel'

export interface MyAccountFields {
  firstname: string
  lastname: string
  email: string
  phone: string
}

interface MyAccountProps extends FormikProps<MyAccountFields> {}

const MyAccountForm: React.FC<MyAccountProps> = ({}) => {
  return (
    <Form className="w-full h-full flex flex-col justify-between">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <FormLabel>Nom</FormLabel>
          <Field name="lastname" component={Input} placeholder="Saisir un Nom" />

          <FormLabel className="mt-5">Prénom</FormLabel>
          <Field name="firstname" placeholder="Saisir un Prénom" component={Input} />
        </div>
        <div>
          <FormLabel>E-mail</FormLabel>
          <Field name="email" component={Input} placeholder="Saisir un Email" />

          <FormLabel className="mt-5">Téléphone</FormLabel>
          <Field name="phone" component={Input} placeholder="Saisir un Téléphone" />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Button type="submit" style={{ padding: '10px 30px' }}>
          Enregistrer
        </Button>
      </div>
    </Form>
  )
}

export default MyAccountForm
