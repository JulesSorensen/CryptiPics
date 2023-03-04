import React from 'react'
import { useSelect, UseSelectStateChange } from 'downshift'
import { CustomFieldProps } from 'types/form.types'
import FormError from '@components/Forms/FormsLayout/FormError'
import { getError } from '@utils/form'
import classNames from 'classnames'
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'

interface SelectOption {
  label: string
  value: any
}

interface SelectProps extends CustomFieldProps {
  items: SelectOption[]
  placeholder?: string
  initialValue?: any
  onChange?: (value: any, item?: SelectOption | null) => void
  // classe à appliquer aux éléments à sélectionner au hover
  highLightedClass?: string
  // hauteur maximum du menu de sélection
  maxDropDownHeight?: number | string
  clearable?: boolean
  // Si true l'affichage de la valeur s'affichera en entier sur plusieurs lignes si nécessaire
  wrapDisplayValue?: boolean
}

const Select: React.FC<SelectProps> = props => {
  const {
    name,
    items,
    initialValue,
    onChange,
    className = '',
    placeholder = 'Sélectionner ...',
    highLightedClass = 'bg-secondary',
    maxDropDownHeight,
    form,
    field,
    style,
    disabled,
    clearable = false,
    wrapDisplayValue = false
  } = props

  const itemToString = (item: SelectOption | null) => (item ? item.label : '')

  const onSelectedItemChange = ({ selectedItem }: UseSelectStateChange<SelectOption>) => {
    if (onChange) {
      onChange(selectedItem ? selectedItem.value : null, selectedItem ? selectedItem : null)
    }

    if (form && field) {
      form.setFieldValue(field.name, selectedItem ? selectedItem.value : '')
    }
  }

  const valueToSelectedItem = (value: any): SelectOption | undefined => {
    if (!value) {
      return undefined
    }

    const selectedOption = items.find(item => item.value === value)

    return {
      label: selectedOption ? selectedOption.label : value,
      value
    }
  }

  const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps, reset } = useSelect(
    {
      items,
      itemToString,
      onSelectedItemChange,
      initialSelectedItem: valueToSelectedItem(field ? field.value : initialValue),
      onStateChange: ({ type }) => {
        switch (type) {
          case useSelect.stateChangeTypes.MenuBlur:
            if (form && field && !form.touched[field.name]) {
              form.setFieldTouched(field.name, true)
            }

            break
        }
      }
    }
  )

  const focusClassName = `input-focus`

  const error = getError({ field, form })

  return (
    <div>
      <div {...getMenuProps()} className="relative" style={style}>
        <div
          {...getToggleButtonProps()}
          className={classNames({
            input: true,
            error,
            [focusClassName]: isOpen && !disabled,
            'text-gray-400': !selectedItem,
            [className]: true,
            disabled,
            flex: true,
            'items-stretch': true,
            'cursor-pointer': true
          })}
          style={{ paddingRight: 0 }}
        >
          <div
            className={classNames('flex-grow overflow-hidden ', {
              'whitespace-nowrap': !wrapDisplayValue,
              placeholder: !(selectedItem && selectedItem.label)
            })}
          >
            {(selectedItem && selectedItem.label) || placeholder}
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
            w-full bg-white dark:bg-slate-600 rounded-lg border dark:text-white border-gray-200 dark:border-slate-700 overflow-hidden
            mt-1`,
              { 'overflow-y-scroll': maxDropDownHeight }
            )}
            style={{ maxHeight: maxDropDownHeight, zIndex: 200 }}
            data-testid="select-dropdown"
          >
            {items.map((item, index) => {
              const isHighLighted = highlightedIndex === index
              return (
                <div
                  key={`${item}${index}`}
                  className={classNames(`cursor-pointer px-4 py-2 text-sm overflow-hidden`, {
                    'text-white dark:text-slate-600': isHighLighted,
                    [highLightedClass]: isHighLighted
                  })}
                  {...getItemProps({ item, index })}
                >
                  {item.label}
                </div>
              )
            })}
            {items.length === 0 && <div className="text-slate-600 dark:text-white px-4 py-2">Aucun résultat</div>}
          </div>
        )}
      </div>
      {error && <FormError error={error} />}
    </div>
  )
}

export default Select
