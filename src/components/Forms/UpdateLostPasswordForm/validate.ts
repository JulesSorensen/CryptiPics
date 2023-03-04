import { UpdateLostPasswordFields } from './index'

const validateUpdateLostPasswordForm = (values: UpdateLostPasswordFields) => {
  const errors: any = {}

  if (!values.password || values.password.length < 5) {
    errors.password = "Veuillez entrer un mot de passe d'au moins 5 caractères"
  }

  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Les deux entrées sont différentes'
  }

  return errors
}

export default validateUpdateLostPasswordForm
