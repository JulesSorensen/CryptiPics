import React, { useState } from 'react'
import ReactDatePicker, { ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import { CustomFieldProps } from 'types/form.types'
import { format } from 'date-fns'
import classNames from 'classnames'
import 'react-datepicker/dist/react-datepicker.css'
import './styles.pcss'
import { ArrowSmLeftIcon, ArrowSmRightIcon, CalendarIcon } from '@heroicons/react/outline'

registerLocale('fr', fr)

interface DatePickerProps extends CustomFieldProps {
  placeholder: string
  mode?: 'input' | 'calendar'
  value: Date
  onChange?: (date: Date) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = 'Veuillez saisir une date',
  className = '',
  mode = 'input',
  value,
  onChange,
  form,
  field
}) => {
  const selectedDate = field ? field.value : value
  const stringDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''

  const inputComponent = (
    <div className="">
      <div className="input-icon">
        <CalendarIcon className="w-5 h-5" />
      </div>
      <input readOnly placeholder={placeholder} value={stringDate} className={`input input-with-icon ${className}`} />
    </div>
  )

  const onDayChange = (newValue: Date) => {
    if (onChange) {
      onChange(newValue)
    }

    if (form && field) {
      form.setFieldValue(field.name, newValue)
    }
  }

  const [monthYearMode, setMonthYearMode] = useState(false)

  const renderHeader = ({ date, changeYear, decreaseMonth, increaseMonth }: ReactDatePickerCustomHeaderProps) => {
    const onNext = () => {
      if (monthYearMode) {
        changeYear(date.getFullYear() + 1)
      } else {
        increaseMonth()
      }
    }

    const onPrevious = () => {
      if (monthYearMode) {
        changeYear(date.getFullYear() - 1)
      } else {
        decreaseMonth()
      }
    }

    return (
      <div>
        <div className="flex justify-around mt-3">
          <div
            className={classNames(
              'px-2 py-1 rounded-md cursor-pointer',
              { 'bg-secondary text-white': !monthYearMode },
              { 'hover:bg-slate-200': monthYearMode }
            )}
            onClick={() => setMonthYearMode(false)}
          >
            Mois / Jour
          </div>
          <div
            className={classNames(
              'px-2 py-1 rounded-md cursor-pointer',
              { 'bg-secondary text-white': monthYearMode },
              { 'hover:bg-slate-200': !monthYearMode }
            )}
            onClick={() => setMonthYearMode(true)}
          >
            Année / mois
          </div>
        </div>
        <div
          style={{
            margin: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div className="absolute left-2 p-3 cursor-pointer rounded-md hover:bg-slate-200" onClick={onPrevious}>
            <ArrowSmLeftIcon className="w-4 h-4" />
          </div>

          <div className="capitalize font-semibold text-lg flex">
            {!monthYearMode && <div className="rounded-md p-1">{format(date, 'MMMM', { locale: fr })}</div>}
            <div className="rounded-md p-1 ml-1">{format(date, 'yyyy')}</div>
          </div>

          <div className="absolute right-2 p-3 cursor-pointer rounded-md hover:bg-slate-200" onClick={onNext}>
            <ArrowSmRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    )
  }

  const onSelect = () => {
    setMonthYearMode(false)
  }

  return (
    <div className="date-picker">
      <ReactDatePicker
        selected={field ? field.value : value}
        locale="fr"
        onChange={onDayChange}
        customInput={inputComponent}
        renderCustomHeader={renderHeader}
        showMonthYearPicker={monthYearMode}
        showTwoColumnMonthYearPicker
        shouldCloseOnSelect={!monthYearMode}
        onSelect={onSelect}
        inline={mode !== 'input'}
      />
    </div>
  )
}

export default DatePicker
