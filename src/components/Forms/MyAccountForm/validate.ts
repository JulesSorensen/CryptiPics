import { object, string } from 'yup'

const validateMyAccountForm = object().shape({
  lastname: string().required('Veuillez saisir un nom de famille'),
  firstname: string().required('Veuillez saisir un prénom'),
  email: string().required('Veuillez saisir un e-mail')
})

export default validateMyAccountForm
