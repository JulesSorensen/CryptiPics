import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import Select from '.'
import '@testing-library/jest-dom'

const options = [
  {
    label: 'Option 1',
    value: 'option1'
  },
  {
    label: 'Option 2',
    value: 'option2'
  },
  {
    label: 'Option 3',
    value: 'option3'
  }
]

describe('Select', () => {
  const onChange = jest.fn()
  const placeholder = 'Placeholder personnalisé'

  const optionToSelect = options[1]

  beforeEach(() => {
    onChange.mockClear()
    render(
      <>
        <Select items={options} onChange={onChange} placeholder={placeholder} clearable />
      </>
    )
  })

  it("Le menu doit s'afficher au click sur le placeholder", () => {
    screen.getByText(placeholder).click()
    expect(screen.getByTestId('select-dropdown')).toBeVisible()
  })

  it('La valeure initiale doit s\'afficher dans le champs si elle est renseignée', () => {
    render(
      <>
        <Select items={options} onChange={onChange} placeholder={placeholder} clearable initialValue={optionToSelect.value} />
      </>
    )

    expect(screen.getByText(optionToSelect.label)).toBeVisible()
  })

  describe("Après la sélection d'une option", () => {
    beforeEach(() => {
      screen.getByText(placeholder).click()
      screen.getByText(optionToSelect.label).click()
    })

    it("Le menu ne doit plus s'afficher", async () => {
      expect(screen.queryByTestId('select-dropdown')).not.toBeInTheDocument()
    })

    it("onChange doit être appelé avec l'option sélectionnée", async () => {
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(optionToSelect.value, optionToSelect)
        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })

    describe("Après réinitialisation du champ", () => {
      beforeEach(() => {
        screen.getByTitle("vider").click()
      })

      it('Le placeholder doit s\'afficher', () => {
        expect(screen.getByText(placeholder)).toBeVisible()
      })

      it('onChange doit être appelé', async () => {
        waitFor(() => {
          expect(onChange).toHaveBeenCalledTimes(2)
          expect(onChange).toHaveBeenCalledWith(null, null)
        })
      })
    })
  })
})
