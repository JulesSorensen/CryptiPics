import DarkModeSwitch from '@components/DarkModeSwitch'
import UpdateLostPasswordForm, { UpdateLostPasswordFields } from '@components/Forms/UpdateLostPasswordForm'
import validateUpdateLostPasswordForm from '@components/Forms/UpdateLostPasswordForm/validate'
import useQueryParam from '@hooks/useQueryParam'
import routes from '@routes'
import { updateLostPassword } from '@services/iam'
import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isApiError } from 'types/nestjs.types'

const UpdateLostPassword: React.FC = () => {
  let [token] = useQueryParam<string | undefined>('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN)
    }
  }, [token])

  const onSubmit = async (values: UpdateLostPasswordFields) => {
    try {
      // await updateLostPassword(values.password)
      toast.success('Votre mot de passe a bien été mis à jour')
      navigate(routes.LOGIN)
    } catch (error) {
      if (isApiError(error) && error && error.statusCode === 400) {
        toast.error('Votre demande a expiré, veuillez relancer la procédure')
      } else {
        toast.error('Un problème est survenu')
      }
    }
  }

  return (
    <div className="p-5 m-auto sm:p-0 w-screen h-screen flex justify-center content-center items-stretch dark:bg-slate-800">
      <div className="absolute top-2 right-2">
        <DarkModeSwitch />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="page-title mb-10 text-white">Réinitialiser votre mot de passe</div>

        <Formik
          initialValues={{ password: '', passwordConfirm: '' }}
          onSubmit={onSubmit}
          component={UpdateLostPasswordForm}
          validate={validateUpdateLostPasswordForm}
        />
      </div>
    </div>
  )
}

export default UpdateLostPassword
