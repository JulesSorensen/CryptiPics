import Button from '@components/Button'
import Input from '@components/Fields/Input'
import { LockClosedIcon, UserIcon } from '@heroicons/react/outline'
import routes from '@routes'
import { getTranslation } from '@src/languages'
import { Field, Form, FormikProps } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'

export interface LoginFields {
  username: string
  email?: string
  password: string
}

interface LoginFormProps extends FormikProps<LoginFields> { }

const LoginForm: React.FC<LoginFormProps> = ({ }) => {
  return (
    <Form className="w-full">
      <Field name="username" placeholder={getTranslation('loginPage.usernameInputPlaceholder')} component={Input} icon={<UserIcon className="w-5 h-5" />} />
      <Field
        name="password"
        placeholder={getTranslation('loginPage.passwordInputPlaceholder')}
        type="password"
        component={Input}
        icon={<LockClosedIcon className="w-5 h-5" />}
      />

      <div className="flex justify-center mt-10">
        <Button type="submit" className="p-4 mx-5 w-full rounded-2xl">
          {getTranslation('loginPage.loginButton')}
        </Button>
      </div>

      <Link to={routes.LOST_PASSWORD}>
        <div className="flex justify-center mt-2 underline decoration-primary underline-offset-4 hover:opacity-50 dark:text-white">
          {getTranslation('loginPage.forgotPasswordRedirect')}
        </div>
      </Link>

      <Link to={routes.LOST_PASSWORD}>
        <div className="flex justify-center mt-2 underline decoration-primary underline-offset-4 hover:opacity-50 dark:text-white">
          {getTranslation('loginPage.registerRedirect')}
        </div>
      </Link>
    </Form>
  )
}

export default LoginForm
