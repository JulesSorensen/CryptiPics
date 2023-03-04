import { useState, useEffect } from 'react'

interface ITimeoutSettings {
  duration: number
  onDone?: () => void
  startOnRender?: boolean
}

const defaultSettings = {
  duration: 1000,
  startOnRender: true
}

const useTimeout = ({ duration, onDone, startOnRender }: ITimeoutSettings = defaultSettings) => {
  const [done, setDone] = useState(false)

  const handleTimeout = () => {
    setTimeout(() => {
      setDone(true)

      if (onDone) {
        onDone()
      }
    }, duration)
  }

  useEffect(() => {
    if (startOnRender) {
      handleTimeout()
    }
  }, [])

  const init = () => {
    setDone(false)

    handleTimeout()
  }

  return {
    done,
    init
  }
}

export default useTimeout
