import { useEffect, useState } from 'react'

const usePagination = (handlePageChange: (newPageNumber: number) => void, skipped?: number, initialPage = 1) => {
  const [pageNumber, setPageNumber] = useState(initialPage)

  const onPageChange = (newPageNumber = 1) => {
    setPageNumber(newPageNumber)
    handlePageChange(newPageNumber)
  }

  return {
    pageNumber,
    onPageChange,
    setPageNumber
  }
}

export default usePagination
