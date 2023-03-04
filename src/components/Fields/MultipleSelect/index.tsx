import React, { useMemo } from 'react'
import { useMultipleSelection, useSelect } from 'downshift'
import { CustomFieldProps } from 'types/form.types'
import useEffectNotOnFirstRender from '@hooks/useEffectNotOnFirstRender'
import classNames from 'classnames'
import { getError } from '@utils/form'
import FormError from '@components/Forms/FormsLayout/FormError'
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'

interface SelectOption {
  label: string
  value: any
}

interface MultipleSelectProps extends CustomFieldProps {
  items: SelectOption[]
  placeholder?: string
  initialValue?: any[]
  onChange?: (value: SelectOption[]) => void
  // classe à appliquer aux éléments à sélectionner au hover
  highLightedClass?: string
  // hauteur maximum du menu de sélection
  maxDropDownHeight?: number | string
  // lorsqu'un élément est sélectionné, la liste déroulante se ferme
  closeOnSelect?: boolean
  clearable?: boolean
  // Si true l'affichage de la valeur s'affichera en entier sur plusieurs lignes si nécessaire
  wrapDisplayValue?: boolean
}

const MultipleSelect: React.FC<MultipleSelectProps> = props => {
  const {
    name,
    items,
    onChange,
    className = '',
    highLightedClass = 'bg-secondary',
    maxDropDownHeight,
    form,
    field,
    initialValue = [],
    closeOnSelect = true,
    placeholder = 'Sélectionner ...',
    style,
    disabled,
    clearable = false,
    wrapDisplayValue = false
  } = props

  const error = getError({ form, field })

  const itemToString = (item: SelectOption | null) => (item ? item.label : '')

  const valueToSelectedItems = (value: any[]): SelectOption[] => {
    return value.map(valueItem => {
      const selectedOption = items.find(item => item.value === valueItem)

      return {
        label: selectedOption ? selectedOption.label : valueItem,
        value: valueItem
      }
    })
  }

  const {
    selectedItems,
    addSelectedItem,
    getDropdownProps,
    getSelectedItemProps,
    removeSelectedItem,
    reset
  } = useMultipleSelection<SelectOption>({
    initialSelectedItems: valueToSelectedItems(field ? field.value : initialValue)
  })

  const getFilteredItems = () => items.filter(item => selectedItems.indexOf(item) < 0)

  const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    selectedItem: null,
    items: getFilteredItems(),
    itemToString,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: closeOnSelect ? false : true // keep the menu open after selection.
          }
      }
      return changes
    },
    onStateChange: ({ type, selectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuBlur:
          if (form && field && !form.touched[field.name]) {
            form.setFieldTouched(field.name, true)
          }

          break

        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          if (selectedItem) {
            addSelectedItem(selectedItem)
          }
          break
        default:
          break
      }
    }
  })

  useEffectNotOnFirstRender(() => {
    if (onChange) {
      onChange(selectedItems)
    }

    if (form && field) {
      if (!form.touched[field.name]) {
        form.setFieldTouched(field.name, true)
      }
      form.setFieldValue(field.name, selectedItems)
    }
  }, [selectedItems])

  const focusClassName = `input-focus`

  const itemsList = useMemo(() => {
    return getFilteredItems()
  }, [items, selectedItems])

  return (
    <div>
      <div {...getMenuProps()} className="relative" style={style}>
        <div
          {...getToggleButtonProps(getDropdownProps({ preventKeyAction: isOpen }))}
          className={classNames({
            input: true,
            error,
            [focusClassName]: isOpen && !disabled,
            'text-gray-400': !selectedItem,
            [className]: true,
            disabled,
            flex: true,
            'items-stretch': true
          })}
          style={{ paddingRight: 0 }}
        >
          <div
            className={classNames('flex flex-wrap items-center gap-1 flex-grow overflow-hidden', {
              'whitespace-nowrap': !wrapDisplayValue,
              placeholder: selectedItems.length === 0
            })}
          >
            {selectedItems.length === 0 && placeholder}
            {selectedItems.map((selectedItem, index) => {
              return (
                <div
                  className="bg-slate-500 text-white rounded p-1 mr-1 text-xs flex"
                  key={`selected-item-${index}`}
                  {...getSelectedItemProps({ selectedItem, index })}
                >
                  {selectedItem.label}
                  <span
                    className="ml-1 text-xs cursor-pointer flex flex-col justify-center"
                    onClick={e => {
                      e.stopPropagation()
                      removeSelectedItem(selectedItem)
                    }}
                    title="supprimer option"
                  >
                    <XIcon className="w-3 h-3" />
                  </span>
                </div>
              )
            })}
          </div>

          <div className="text-gray-400 flex text-xs">
            {clearable && (
              <div
                className="flex flex-col justify-center hover:text-gray-600 px-2 cursor-pointer"
                onClick={e => {
                  e.stopPropagation()
                  reset()
                }}
                title="vider"
              >
                <XIcon className="w-4 h-4" />
              </div>
            )}

            <div
              className={classNames(
                'flex flex-col justify-center hover:text-gray-600 pr-2 pl-2 cursor-pointer border-l',
                { 'text-gray-600': isOpen }
              )}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {(field || name) && (
          <input type="hidden" name={field ? field.name : name} value={selectedItem ? selectedItem.value : ''} />
        )}

        {isOpen && !disabled && (
          <div
            className={classNames(
              `absolute top-full left-0
            w-full bg-white rounded-lg border dark:bg-slate-600 border-gray-200 overflow-hidden dark:border-slate-700 dark:text-white
            mt-1`,
              { 'overflow-y-scroll': maxDropDownHeight }
            )}
            style={{ maxHeight: maxDropDownHeight, zIndex: 200 }}
            data-testid="select-dropdown"
          >
            {itemsList.length === 0 && <div className="text-slate-600 dark:text-white px-4 py-2">Aucun résultat</div>}
            {itemsList.map((item, index) => {
              const isHighLighted = highlightedIndex === index
              return (
                <div
                  key={`${item}${index}`}
                  className={classNames(`cursor-pointer px-4 py-2 overflow-hidden text-sm`, {
                    'text-white dark:text-slate-600': isHighLighted,
                    [highLightedClass]: isHighLighted
                  })}
                  {...getItemProps({ item, index })}
                >
                  {item.label}
                </div>
              )
            })}
          </div>
        )}
      </div>
      {error && <FormError error={error} />}
    </div>
  )
}

export default MultipleSelect
