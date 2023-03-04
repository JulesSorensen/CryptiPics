import { UpdatePasswordFields } from './index'

const validatePasswordForm = (values: UpdatePasswordFields) => {
  const errors: any = {}

  if (!values.password || values.password.length < 5) {
    errors.password = "Veuillez entrer un mot de passe d'au moins 5 caractères"
  }

  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Les deux entrées sont différentes'
  }

  return errors
}

export default validatePasswordForm
