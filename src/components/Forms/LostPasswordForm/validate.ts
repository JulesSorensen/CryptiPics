import { object, string } from 'yup'

const validateLostPasswordForm = object().shape({
  email: string().required('Veuillez saisir un e-mail valide')
})

export default validateLostPasswordForm
