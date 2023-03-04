import { useReducer, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { isApiError } from 'types/nestjs.types'

const initialState = {
  pending: false,
  failed: false,
  done: false
}

interface IServiceState {
  pending: boolean
  failed: boolean
  done: boolean
}

type StateActionType = 'pending' | 'failed' | 'done'
interface IStateAction {
  type: StateActionType
}

const stateReducer = (state: IServiceState, action: IStateAction) => {
  switch (action.type) {
    case 'pending':
      return {
        pending: true,
        failed: false,
        done: false
      }

    case 'failed':
      return {
        ...state,
        pending: false,
        failed: true
      }

    case 'done':
      return {
        ...state,
        pending: false,
        done: true
      }
  }
}

interface IOptions<D> {
  onSuccess?: (data: D) => void
  onError?: (error: any) => void
  defaultValue?: any
  errorToastDisabled?: boolean
}

function useService<D>(options: IOptions<D> = {}) {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const [data, setData] = useState<D>(options.defaultValue)

  const service = async (promise: () => Promise<D>) => {
    dispatch({ type: 'pending' })

    try {
      const result = await promise()

      setData(result)

      if (options.onSuccess) {
        options.onSuccess(result)
      }

      dispatch({ type: 'done' })
    } catch (error) {
      dispatch({ type: 'failed' })

      if (options.onError) {
        options.onError(error)
      } else if (!options.errorToastDisabled) {
        if (isApiError(error) && error.statusCode !== 500) {
          toast.error(error.message)
        } else {
          toast.error('Un problème est survenu')
        }
      }
    }
  }

  return {
    service,
    data,
    ...state
  }
}

export default useService
