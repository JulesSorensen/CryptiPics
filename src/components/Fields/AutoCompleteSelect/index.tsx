import React, { useEffect, useState } from 'react'
import { useCombobox, UseComboboxStateChange } from 'downshift'
import { CustomFieldProps } from 'types/form.types'
import FormError from '@components/Forms/FormsLayout/FormError'
import { getError } from '@utils/form'
import classNames from 'classnames'
import Loader from '@components/Loader'
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'

interface SelectOption {
  label: string
  value: any
}

interface AutoCompleteSelectProps extends CustomFieldProps {
  loadItems?: (search: string) => Promise<SelectOption[]>
  items?: SelectOption[]
  placeholder?: string
  initialValue?: any[]
  onChange?: (value: any, item?: SelectOption | null) => void
  // classe à appliquer aux éléments à sélectionner au hover
  highLightedClass?: string
  // hauteur maximum du menu de sélection
  maxDropDownHeight?: number | string
  clearable?: boolean
  initialSelectedItem?: SelectOption
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = props => {
  const {
    items = [],
    onChange,
    className = '',
    placeholder = 'Sélectionner ...',
    highLightedClass = 'bg-secondary',
    maxDropDownHeight,
    form,
    field,
    style,
    disabled,
    loadItems,
    clearable = false,
    initialSelectedItem
  } = props

  const [inputItems, setInputItems] = useState(items ? items : [])
  const [isLoading, setIsLoading] = useState(false)

  const onSelectedItemChange = ({ selectedItem }: UseComboboxStateChange<SelectOption>) => {
    if (onChange) {
      onChange(selectedItem ? selectedItem.value : null, selectedItem)
    }

    if (form && field) {
      form.setFieldValue(field.name, selectedItem ? selectedItem.value : '')
    }
  }

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    openMenu,
    closeMenu,
    reset,
    setInputValue,
    inputValue
  } = useCombobox({
    items: inputItems,
    onSelectedItemChange,
    initialSelectedItem
  })

  useEffect(() => {
    let mounted = true

    if (!loadItems && inputValue && mounted) {
      setInputItems(items.filter(item => item.value.toLowerCase().startsWith(inputValue.toLowerCase())))
    }

    if (loadItems) {
      setIsLoading(true)
      loadItems(inputValue ? inputValue : '').then(items => {
        if (mounted) {
          setInputItems(items)
        }
        setIsLoading(false)
      })
    }

    return () => {
      mounted = false
    }
  }, [inputValue])

  const inputProps = getInputProps()

  useEffect(() => {
    closeMenu()
  }, [selectedItem])

  const focusClassName = `input-focus`

  const error = getError({ field, form })

  const onInputFocus = () => {
    openMenu()
    setInputValue('')
  }

  return (
    <div>
      <div {...getMenuProps()} className="relative" style={style}>
        <div
          {...getComboboxProps()}
          className={classNames({
            input: true,
            error,
            [focusClassName]: isOpen && !disabled,
            [className]: true,
            disabled,
            flex: true,
            'items-stretch': true,
            'cursor-pointer': true
          })}
          style={{ paddingRight: 0 }}
        >
          <input
            onFocus={onInputFocus}
            onBlur={closeMenu}
            className="outline-none min-w-0 cursor-pointer dark:bg-transparent"
            {...inputProps}
            value={selectedItem && !isOpen ? selectedItem.label : inputProps.value}
            placeholder={placeholder}
            style={{ flex: '1 2 0px' }}
            onClick={() => {
              if (!isOpen) {
                openMenu()
              }
            }}
          />

          <div className="text-gray-400 flex text-xs">
            {clearable && (
              <div
                className="flex flex-col justify-center hover:text-gray-600 px-2 cursor-pointer"
                onClick={e => {
                  e.stopPropagation()
                  reset()
                }}
              >
                <XIcon className="w-4 h-4" />
              </div>
            )}

            <div
              className={classNames(
                'flex flex-col justify-center hover:text-gray-600 pr-2 pl-2 cursor-pointer border-l',
                { 'text-gray-600': isOpen }
              )}
              onClick={onInputFocus}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {isOpen && !disabled && (
          <div
            className={classNames(
              `absolute top-full left-0
            w-full bg-white rounded-lg border border-gray-200 dark:bg-slate-600 dark:border-slate-700 dark:text-white`,
              {
                'overflow-y-scroll': maxDropDownHeight
              }
            )}
            style={{ maxHeight: maxDropDownHeight, zIndex: 200 }}
            data-testid="select-dropdown"
          >
            {!isLoading &&
              inputItems.map((item, index) => {
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
            {isLoading && (
              <div className="py-3" data-testid="loader">
                <Loader height={30} width={30} />
              </div>
            )}
            {!isLoading && inputItems.length === 0 && (
              <div className="text-slate-600 dark:text-white px-4 py-2">Aucun résultat</div>
            )}
          </div>
        )}
      </div>
      {error && <FormError error={error} />}
    </div>
  )
}

export default AutoCompleteSelect
