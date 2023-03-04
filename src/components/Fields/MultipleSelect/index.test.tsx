import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import MultipleSelect from '.'
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

describe('MultipleSelect', () => {
  const onChange = jest.fn()
  const placeholder = 'Placeholder personnalisé'

  const optionToSelect1 = options[1]
  const optionToSelect2 = options[2]

  beforeEach(() => {
    onChange.mockClear()
    render(
      <>
        <MultipleSelect items={options} onChange={onChange} placeholder={placeholder} clearable />
      </>
    )
  })

  it("Le menu doit s'afficher au click sur le placeholder", () => {
    screen.getByText(placeholder).click()
    expect(screen.getByTestId('select-dropdown')).toBeVisible()
  })

  it('Les valeures initiales doivent s\'afficher dans le champs si renseignées', () => {
    render(
      <>
        <MultipleSelect items={options} onChange={onChange} placeholder={placeholder} clearable initialValue={[optionToSelect1.value, optionToSelect2.value]} />
      </>
    )

    expect(screen.getByText(optionToSelect1.label)).toBeVisible()
    expect(screen.getByText(optionToSelect2.label)).toBeVisible()
  })


  describe("Après la sélection d'une option", () => {
    beforeEach(() => {
      screen.getByText(placeholder).click()
      screen.getByText(optionToSelect1.label).click()
    })

    it("Le menu ne doit plus s'afficher", async () => {
      expect(screen.queryByTestId('select-dropdown')).not.toBeInTheDocument()
    })

    it("L'option doit s'afficher dans le champ'", async () => {
      expect(await screen.findByText(optionToSelect1.label)).toBeInTheDocument()
    })

    it("onChange doit être appelé avec l'option sélectionnée", async () => {
      await waitFor(() => {
        // expect(onChange).toHaveBeenCalledWith([optionToSelect1.value, optionToSelect2.value])
        expect(onChange).toHaveBeenCalledWith([optionToSelect1])
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
        await waitFor(() => {
          expect(onChange).toHaveBeenCalledTimes(2)
          expect(onChange).toHaveBeenLastCalledWith([])
        })
      })
    })
  })

  describe("Après la sélection de deux options", () => {
    beforeEach(() => {
      screen.getByText(placeholder).click()
      screen.getByText(optionToSelect1.label).click()
      screen.getByText(placeholder).click()
      screen.getByText(optionToSelect2.label).click()
    })

    it("Les deux options doivent s'afficher dans le champ'", async () => {
      expect(await screen.findByText(optionToSelect1.label)).toBeInTheDocument()
      expect(await screen.findByText(optionToSelect2.label)).toBeInTheDocument()
    })

    it("Si on retire l'option 1, seule l'option 2 reste affichée dans le champ'", async () => {
      const deleteButton = await screen.findAllByTitle('supprimer option')
      deleteButton[0].click()

      expect(screen.queryByText(optionToSelect1.label)).not.toBeInTheDocument()
      expect(screen.getByText(optionToSelect2.label)).toBeInTheDocument()
    })

    it("onChange nous transmet les deux options", async () => {
      await waitFor(() => {
        expect(onChange).toHaveBeenLastCalledWith([optionToSelect1, optionToSelect2])
      })
    })
  })
})
