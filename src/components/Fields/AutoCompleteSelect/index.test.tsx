import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import AutoCompleteSelect from '.'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

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

describe('AutoCompleteSelect', () => {
  const onChange = jest.fn()
  const loadItems = jest.fn(() => Promise.resolve(options))
  const user = userEvent.setup()

  const placeholder = 'Placeholder personnalisé'

  beforeEach(() => {
    onChange.mockClear()
    loadItems.mockClear()

    act(() => {
      render(
        <>
          <AutoCompleteSelect onChange={onChange} placeholder={placeholder} loadItems={loadItems} clearable />
        </>
      )
    })
  })

  it("Le menu doit s'afficher au click sur le placeholder", async () => {
    // expect(loadItems).toHaveBeenCalledTimes(1)

    await user.click(screen.getByPlaceholderText(placeholder))

    expect(await screen.findByTestId('select-dropdown')).toBeVisible()

    await user.type(screen.getByPlaceholderText(placeholder), '1')
    // expect(screen.getByTestId('loader')).toBeInTheDocument()

    // expect(loadItems).toHaveBeenCalledTimes(2)
    // expect(screen.queryByText('/chargement/i')).not.toBeInTheDocument()

    // await waitForElementToBeRemoved(() => screen.findByText(/chargement/i))

    // expect(await screen.findByText('Chargement ...')).toBeInTheDocument()

    // expect(await screen.findByTestId('select-dropdown')).toBeVisible()

    /* await waitFor(() => {
      expect(screen.getByTestId('select-dropdown')).toBeVisible()
    }) */
  })
})
/* describe('Après saisi d\'un texte dans le champs', () => {
  beforeEach(() => {
    screen.getByText(placeholder).click()
  })
}) */
