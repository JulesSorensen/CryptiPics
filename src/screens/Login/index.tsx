import React, { useEffect, useState } from 'react'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import { setLogin } from '@stores/login/actions'
import { useStore } from '@stores/index'
import routes from '@routes'
import LoginForm, { LoginFields } from '@components/Forms/LoginForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '@services/iam'
import DarkModeSwitch from '@components/DarkModeSwitch'
import { Roles } from '@constants/roles'

const Login: React.FC = () => {
  const { state, dispatch } = useStore()
  let navigate = useNavigate()
  const [pending, setPending] = useState<boolean>(false)

  const onSubmit = async (values: LoginFields, helpers: FormikHelpers<LoginFields>) => {
    if (pending) {
      return
    }

    setPending(true)
    try {
      // const authResult = await login(values.email, values.password)
      const authResult = {
        access_token: 'mock',
        user: {
          id: 1,
          firstname: 'Jules',
          lastname: 'Lad',
          email: values.email,
          roles: [Roles.ADMIN],
          enabled: true
        }
      }

      dispatch(setLogin(authResult))

      toast.success(`Vous êtes désormais connecté en tant que ${authResult.user.firstname} ${authResult.user.lastname}`)
    } catch (error) {
      helpers.resetForm()
      toast.error('Identifiant ou mot de passe incorrect')
    }

    setPending(false)
  }

  useEffect(() => {
    if (state.login.currentUser) {
      navigate(routes.HOME)
    }
  }, [state.login.currentUser])

  return (
    <div className="p-5 m-auto sm:p-0 w-screen h-screen flex justify-center content-center items-stretch dark:bg-slate-800">
      <div className="absolute top-2 right-2">
        <DarkModeSwitch />
      </div>
      <div className="flex flex-col pt-14 items-center">
        <img src={'img/logo/cryptipics.png'} className="mt-28 mb-10" alt="logo cryptipics" width="350" />

        <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
          {(formikProps: FormikProps<LoginFields>) => <LoginForm {...formikProps} />}
        </Formik>
      </div>
    </div>
  )
}

export default Login
