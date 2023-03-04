import { useEffect, useState } from 'react'

// Params:
// nodeRef => This node must contain both the button opening the dropdown and the dropdown content
// Returns:
// toggle => function to hide/show the dropdown
// active => true if visible, false if hidden
const useDropdown = (nodeRef: React.RefObject<HTMLElement>) => {
  const [active, setActive] = useState(false)

  const onDomClick = (event: MouseEvent) => {
    const element = event.target as HTMLElement

    if (nodeRef && nodeRef.current) {
      if (nodeRef.current.contains(element)) {
        return
      }

      setActive(false)
    }
  }

  const toggle = () => setActive(!active)

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', onDomClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', onDomClick)
    }
  }, [])

  return {
    toggle,
    active
  }
}

export default useDropdown
