import React, { useState } from 'react'
import { toast } from 'react-toastify'
import FileSaver from 'file-saver'
import { formatDate } from '@utils/string'

export interface ICsvColumn {
  Header: string
  accessor?: string
  render?: (column: ICsvColumn, value?: any) => React.ReactNode
  isDate?: boolean
}

interface ICsvSettings {
  fileName: string
  loadDatas?: () => Promise<any[]>
  datas?: any[]
}

const useCsvGenerator = (columns: ICsvColumn[]) => {
  const [isPending, setIsPending] = useState(false)

  const download = async ({ loadDatas, datas, fileName }: ICsvSettings) => {
    setIsPending(true)

    try {
      const result = datas ? datas : loadDatas ? await loadDatas() : []

      // Let's build the headers
      const headerRow = columns
        .map(column => {
          return `${column.Header}`
        })
        .join(';')

      const rows = result.map(data => {
        return columns
          .map(column => {

            const { accessor, render, isDate } = column


            const value = accessor ? data[accessor] : undefined

            const cellContent = render ? render(column, value) : isDate ? formatDate(value) : value ? value : ''

            return `${cellContent}`
          })
          .join(';')
      })

      const csvContent = [headerRow, ...rows].join(`\n`)
      const contentType = 'text/csv'

      const csvBlob = new Blob([csvContent], { type: contentType })

      FileSaver.saveAs(csvBlob, `${fileName}.csv`)
    } catch (error) {
      toast.error('La Génération du PDF a échouée')
    }

    setIsPending(false)
  }

  return {
    download,
    isPending
  }
}

export default useCsvGenerator
