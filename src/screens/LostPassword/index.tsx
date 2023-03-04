import DarkModeSwitch from '@components/DarkModeSwitch'
import LostPasswordForm, { LostPasswordFields } from '@components/Forms/LostPasswordForm'
import validateLostPasswordForm from '@components/Forms/LostPasswordForm/validate'
import useService from '@hooks/useService'
import { lostPassword } from '@services/iam'
import { Formik, FormikHelpers } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'

const LostPassword: React.FC = () => {
  const { service } = useService({
    onSuccess: () => {
      toast.success('Votre demande a bien été prise en compte')
    },
    onError: () => {
      toast.error('Un problème est survenu')
    }
  })

  const onSubmit = async (values: LostPasswordFields, formik: FormikHelpers<LostPasswordFields>) => {
    try {
      //await lostPassword(values.email)

      toast.success('Votre demande a bien été prise en compte')
    } catch (error) {
      toast.error('Un problème est survenu')
    }

    formik.resetForm()
  }

  return (
    <div className="p-5 m-auto sm:p-0 w-screen h-screen flex justify-center content-center items-stretch dark:bg-slate-800">
      <div className="absolute top-2 right-2">
        <DarkModeSwitch />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="page-title mb-10 dark:text-white">Réinitialiser votre mot de passe</div>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={onSubmit}
          component={LostPasswordForm}
          validationSchema={validateLostPasswordForm}
        />
      </div>
    </div>
  )
}

export default LostPassword
