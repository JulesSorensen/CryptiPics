import { useEffect, useState } from 'react'

const useHandleSubmissionError = (submitCount: number, isValid: boolean, onSubmissionError: () => void) => {
  useEffect(() => {
    if (submitCount > 0 && !isValid) {
      onSubmissionError()
    }
  }, [submitCount, isValid])

  return null
}

export default useHandleSubmissionError
