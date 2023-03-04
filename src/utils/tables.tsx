import React from 'react'
import { format } from 'date-fns'
import { CellProps } from 'react-table'

export const renderDateCell = (withTime = false) => (cellProps: CellProps<any>) => {
  return <>{cellProps.value && format(new Date(cellProps.value), `dd/MM/yyyy ${withTime ? 'HH:mm' : ''}`)}</>
}
