import { useState } from 'react'

const useModal = () => {
  const [active, setActive] = useState(false)

  const toggle = () => setActive(!active)

  return {
    active,
    toggle
  }
}

export default useModal
