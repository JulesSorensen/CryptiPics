import Button from '@components/Button'
import Input from '@components/Fields/Input'
import { ArrowSmLeftIcon, MailIcon } from '@heroicons/react/outline'
import routes from '@routes'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'

export interface LostPasswordFields {
  email: string
}

interface LostPasswordFormProps extends FormikProps<LostPasswordFields> {}

const LostPasswordForm: React.FC<LostPasswordFormProps> = ({}) => {
  return (
    <Form className="w-full">
      <Field name="email" placeholder="Adresse E-mail" component={Input} icon={<MailIcon className="w-5 h-5" />} />

      <div className="flex justify-center mt-10">
        <Button type="submit" className="p-4 mx-5 w-full rounded-2xl dark:text-slate-800">
          Envoyer
        </Button>
      </div>

      <Link to={routes.LOGIN}>
        <div className="flex justify-center mt-10 underline decoration-primary underline-offset-4 hover:opacity-50">
          <div className="flex items-center gap-3 dark:text-white">
            <ArrowSmLeftIcon className="w-5 h-5" /> <div>Retour à la page de connexion</div>
          </div>
        </div>
      </Link>
    </Form>
  )
}

export default LostPasswordForm
