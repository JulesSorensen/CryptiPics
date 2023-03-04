import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React, { useMemo } from 'react'

interface IPagination {
  activePage: number
  itemsCountPerPage: number
  totalItemsCount: number
  onChange: (newPageNumber: number) => void
}

const Pagination: React.FC<IPagination> = ({ activePage, itemsCountPerPage, totalItemsCount, onChange }) => {
  const numberOfPages = useMemo(() => {
    return Math.ceil(
      itemsCountPerPage >= totalItemsCount
        ? 1
        : (totalItemsCount + (itemsCountPerPage - (totalItemsCount % itemsCountPerPage))) / itemsCountPerPage
    )
  }, [totalItemsCount, itemsCountPerPage])

  const renderPaginationButton = (isNext = true, active: boolean) => {
    const onClick = () => {
      if (active) {
        const newPage = isNext ? activePage + 1 : activePage - 1
        onChange(newPage)
      }
    }

    const arrowClass = classNames(
      'px-3 py-2 ml-0 leading-tigh text-slate-500 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-800',
      {
        'hover:bg-slate-500 hover:text-white': active,
        'opacity-50': !active,
        'border-r-0  rounded-l': !isNext,
        'border rounded-r': isNext,
        'cursor-default': !active
      }
    )

    const arrowBtn = (
      <>
        <button className={arrowClass} onClick={onClick}>
          <div>{isNext ? <ArrowRightIcon className="h-4 w-4" /> : <ArrowLeftIcon className="h-4 w-4" />}</div>
        </button>
      </>
    )

    return arrowBtn
  }

  const renderPageIndexButton = (index: number) => {
    const isCurrentPage = activePage === index

    const onClick = () => {
      if (!isCurrentPage) {
        onChange(index)
      }
    }

    return (
      <button
        onClick={onClick}
        className={`px-3 py-2 ml-0
        cursor-pointer
        leading-tigh
        border
        border-r-0 
        border-gray-200 
        dark:border-gray-800
        hover:bg-slate-500
        hover:text-white
        ${isCurrentPage ? 'bg-slate-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-500'}`}
        key={index}
      >
        {index.toString()}
      </button>
    )
  }

  // On affiche la page 1, les deux pages avant la page active, les deux pages après la page active et la dernière page
  // Si ces 3 écarts ne se suivent pas, on met "..." entre eux
  const pageIndexButtons = useMemo(() => {
    const result = []

    if (numberOfPages < 6) {
      for (let i = 1; i < numberOfPages + 1; i++) {
        result.push(renderPageIndexButton(i))
      }
    } else {
      // Début
      const indexesToDisplay = []
      indexesToDisplay.push(1)

      let startIndex = activePage - 2

      if (startIndex <= 1) {
        startIndex = 2
      }

      let endIndex = activePage + 2

      // Si il y a un ou des nombres entre la page 1 et l'interval, on affiche "...""
      if (startIndex !== 2) {
        indexesToDisplay.push(null)
      }

      // Milieu
      for (let i = startIndex; i <= endIndex && i < numberOfPages; i++) {
        indexesToDisplay.push(i)
      }

      // Si il y a un ou des nombres entre la page active + 2 et la dernière page, on affiche "..."
      if (endIndex <= numberOfPages - 1) {
        indexesToDisplay.push(null)
      }

      // Fin
      indexesToDisplay.push(numberOfPages)

      indexesToDisplay.forEach((index, i) => {
        if (index !== null) {
          result.push(renderPageIndexButton(index))
        } else {
          result.push(
            <div
              className="px-3 py-2 ml-0
              cursor-default
            leading-tigh
            text-slate-500 
            bg-white border
            dark:bg-slate-700
            border-r-0 
            border-gray-200
            dark:border-gray-800
            opacity-75"
              key={`${i}-int`}
            >
              ...
            </div>
          )
        }
      })
    }

    return result
  }, [activePage, numberOfPages])

  const showNextButton = activePage < numberOfPages
  const showPreviousButton = activePage > 1

  return (
    <div className="flex px-4 py-4 overflow-x-auto justify-center">
      <div className="flex mr-4 rounded">
        {renderPaginationButton(false, showPreviousButton)}
        {pageIndexButtons}
        {renderPaginationButton(true, showNextButton)}
      </div>
    </div>
  )
}

export default Pagination
