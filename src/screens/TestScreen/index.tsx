import Button from '@components/Button'
import AutoCompleteSelect from '@components/Fields/AutoCompleteSelect'
import DatePicker from '@components/Fields/DatePicker'
import FileUploader from '@components/Fields/FileUploader'
import Input from '@components/Fields/Input'
import MultipleSelect from '@components/Fields/MultipleSelect'
import RadioButton from '@components/Fields/RadioButton'
import Select from '@components/Fields/Select'
import Switch from '@components/Fields/Switch'
import FormLabel from '@components/Forms/FormsLayout/FormLabel'
import Modal from '@components/Layout/Modal'
import Table, { ITableColumn } from '@components/Tables/Table'
import TableActionCell from '@components/Tables/TableActionCell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useModal from '@hooks/useModal'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import tableData from './table.data'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

const selectItems = [
  {
    label: 'Item 1',
    value: 'item1'
  },
  {
    label: 'Item 2',
    value: 'item2'
  },
  {
    label: 'Item 3',
    value: 'item3'
  },
  {
    label: 'Item 4',
    value: 'item4'
  },
  {
    label: 'Item 5',
    value: 'item5'
  },
  {
    label: 'Item 6',
    value: 'item6'
  }
]

interface ITestScreen {}

const TestScreen: React.FC<ITestScreen> = ({}) => {
  const tableColumns: ITableColumn<any>[] = [
    {
      id: 'action',
      type: 'action',
      Cell: () => {
        return (
          <TableActionCell
            actions={[
              { icon: <FontAwesomeIcon className="w-4 h-4" icon={faMailBulk} />, color: 'red' },
              { type: 'view' },
              { type: 'edit' },
              { type: 'delete' }
            ]}
          />
        )
      }
    },
    {
      Header: 'Prénom',
      accessor: 'firstname',
      filtered: true
    },
    {
      Header: 'Nom',
      accessor: 'lastname'
    },
    {
      Header: 'E-mail',
      accessor: 'email'
    },
    {
      Header: "Date d'inscription",
      accessor: 'inscriptionDate',
      type: 'date',
      filtered: true,
      filterType: 'date'
    },
    {
      Header: 'Activé',
      accessor: 'enabled',
      filtered: true,
      filterType: 'select',
      type: 'boolean',
      filterOptions: [
        {
          label: 'Activé',
          value: true
        },
        {
          label: 'Désactivé',
          value: false
        }
      ]
    }
  ]

  const [selectedDate, setSelectedDate] = useState('')

  const loadData = (pageNumber: number, filters?: any[]) => {}

  const onFileChange = (file: File[]) => {}

  const modal = useModal()

  return (
    <div>
      <div className="page-title">Écran de Test</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <div className="lg:col-span-2">
          <h4 className="section-title mb-3">Tableau</h4>

          <Table
            data={tableData}
            columns={tableColumns}
            loadData={loadData}
            pagination={{ totalItems: 50, itemsPerPage: 5, currentPage: 1, totalPages: 10 }}
            paginated
          />
        </div>

        <div>
          <div className="mb-3">
            <h4 className="section-title mb-3">Bouttons</h4>

            <div className="card flex justify-center flex-wrap gap-1">
              <Button>Primaire</Button>
              <Button className="bg-secondary hover:bg-secondary-dark">Secondaire</Button>
              <Button className="bg-green-600 hover:bg-green-500">Succès</Button>
              <Button className="bg-red-600 hover:bg-red-500">Danger</Button>
              <Button className="bg-gray-400 hover:bg-gray-500">Light</Button>
              <Button className="bg-gray-800 hover:bg-gray-700">Dark</Button>
            </div>
          </div>

          <h4 className="section-title mb-3">Sélecteur de fichier</h4>
          <div className="card flex justify-center mb-4">
            <FileUploader onChange={onFileChange} />
          </div>

          <h4 className="section-title mb-3">Modal</h4>
          <div className="card flex justify-center">
            <Button onClick={modal.toggle}>Ouvrir modal</Button>
          </div>
        </div>

        <div>
          <h4 className="section-title mb-3">Formulaire</h4>

          <Formik
            initialValues={{
              input: '',
              inputIcon: '',
              select: '',
              clearableSelect: '',
              multipleSelect: [],
              autoCompleteSelect: '',
              datePicker: null,
              switch: false,
              radio: true
            }}
            onSubmit={values => {
              console.log({ values })
            }}
          >
            {({ values }) => {
              const loadAutoCompleteItems = async (search: string) => {
                // Mock Async Fetch
                return new Promise(resolve => {
                  const result = selectItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
                  setTimeout(() => resolve(result), 1000)
                })
              }

              return (
                <Form>
                  <div className="card flex flex-col justify-around">
                    <FormLabel>Champs Texte</FormLabel>
                    <Field component={Input} name="input" placeholder="Veuillez saisir du texte" className="mb-5" />

                    <FormLabel className="mt-2">Champs avec icône</FormLabel>
                    <Field
                      component={Input}
                      name="inputIcon"
                      placeholder="Champs avec icône"
                      className="mb-5 py-20"
                      icon={<FontAwesomeIcon className="w-5 h-5" style={{ marginTop: 1 }}  icon={faMailBulk} />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      <div>
                        <FormLabel>Sélecteur</FormLabel>
                        <Field name="select" items={selectItems} component={Select} />
                      </div>

                      <div>
                        <FormLabel>Sélecteur effaçable</FormLabel>
                        <Field name="clearableSelect" items={selectItems} component={Select} clearable />
                      </div>
                    </div>

                    <FormLabel className="mt-2">Sélecteur multiple</FormLabel>
                    <Field name="multipleSelect" items={selectItems} component={MultipleSelect} />

                    <FormLabel className="mt-2">Sélecteur Autocomplete</FormLabel>
                    <Field
                      name="autoCompleteSelect"
                      items={selectItems}
                      component={AutoCompleteSelect}
                      loadItems={loadAutoCompleteItems}
                      clearable
                    />

                    <FormLabel className="mt-2">Sélection de date</FormLabel>
                    <Field name="datePicker" placeholder="Sélectionner une date" component={DatePicker} />

                    <FormLabel className="mt-2 mb-1">Switch</FormLabel>
                    <Field name="switch" component={Switch} />

                    <FormLabel className="mt-2">Boutons Radio</FormLabel>
                    <div className="flex my-2 justify-around">
                      <Field name="radio" label="Option 1" value="result1" component={RadioButton} />
                      <Field name="radio" label="Option 2" value="result2" component={RadioButton} />
                      <Field name="radio" label="Option 3" value="result3" component={RadioButton} />
                    </div>

                    <Button className="mt-2" type="submit">
                      Soumettre
                    </Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>

      <Modal {...modal} title="Ceci est une modal">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <div className="flex justify-center mt-5">
          <Button onClick={modal.toggle}>Fermer</Button>
        </div>
      </Modal>
    </div>
  )
}

export default TestScreen
