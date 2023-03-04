import Button from '@components/Button'
import Input from '@components/Fields/Input'
import { LockClosedIcon, MailIcon } from '@heroicons/react/outline'
import routes from '@routes'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'

export interface LoginFields {
  email: string
  password: string
}

interface LoginFormProps extends FormikProps<LoginFields> {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  return (
    <Form className="w-full">
      <Field name="email" placeholder="Adresse E-mail" component={Input} icon={<MailIcon className="w-5 h-5" />} />
      <Field
        name="password"
        placeholder="Mot de passe"
        type="password"
        component={Input}
        icon={<LockClosedIcon className="w-5 h-5" />}
      />

      <Link to={routes.LOST_PASSWORD}>
        <div className="flex justify-center mt-2 underline decoration-primary underline-offset-4 hover:opacity-50 dark:text-white">
          Mot de passe oublié
        </div>
      </Link>

      <div className="flex justify-center mt-10">
        <Button type="submit" className="p-4 mx-5 w-full rounded-2xl">
          Connexion
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
