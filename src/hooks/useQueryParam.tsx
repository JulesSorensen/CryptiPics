import { useSearchParams } from 'react-router-dom'

export default function useQueryParam<T>(key: string): [T | null] {
  let [searchParams] = useSearchParams()
  let paramValue = searchParams.get(key)

  return [paramValue as T | null]
}
