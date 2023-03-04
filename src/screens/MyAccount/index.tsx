import MyAccountForm, { MyAccountFields } from '@components/Forms/MyAccountForm'
import validateMyAccountForm from '@components/Forms/MyAccountForm/validate'
import UpdatePasswordForm, { UpdatePasswordFields } from '@components/Forms/UpdatePasswordForm'
import validatePasswordForm from '@components/Forms/UpdatePasswordForm/validate'
import Loader from '@components/Loader'
import useService from '@hooks/useService'
import { fetchMyAccountData, MyAccountPayload, updateMyAccountData, updateMyPassword } from '@services/iam'
import { Formik, FormikHelpers } from 'formik'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const MyAccount: React.FC = () => {
  const { service, data, pending } = useService<MyAccountPayload>()

  const loadData = () => {
    service(async () => {
      // return fetchMyAccountData()

      return {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@cryptipics.io',
        phone: '0600000000'
      }
    })
  }

  const onSubmit = async (values: MyAccountFields) => {
    try {
      /* 
        await updateMyAccountData(values)
        loadData()
      */

      toast.success('Vos données ont bien été mises à jour')
    } catch (error) {
      toast.error('Un problème est survenu')
    }
  }

  const onPasswordSubmit = async (values: UpdatePasswordFields, formik: FormikHelpers<UpdatePasswordFields>) => {
    try {
      // await updateMyPassword(values)

      formik.resetForm()

      toast.success('Votre mot de passe a bien été mis à jour')
    } catch (error) {
      formik.resetForm()
      toast.error('Un problème est survenu')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  console.log({ pending, data })

  return (
    <div>
      <div className="page-title">Mon compte</div>

      <div className="flex flex-wrap flex-col lg:flex-row gap-5 mt-10">
        <div className="flex-1 flex flex-col">
          <div className="text-slate-600 mb-3">Mes informations personelles</div>
          <div className="card flex-grow">
            {pending && <Loader />}
            {!pending && data && (
              <Formik
                component={MyAccountForm}
                initialValues={data}
                onSubmit={onSubmit}
                validationSchema={validateMyAccountForm}
                enableReinitialize
              />
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="text-slate-600 mb-3">Mon mot de passe</div>
          <div className="card">
            <Formik
              component={UpdatePasswordForm}
              initialValues={{
                currentPassword: '',
                password: '',
                confirmPassword: ''
              }}
              onSubmit={onPasswordSubmit}
              validate={validatePasswordForm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
