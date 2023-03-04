import { useState, useEffect } from 'react'

/* 
  Ce chook fonctionne come useEffect, mais contrairement à lui 
  il n'éxécute pas la fonction en paramètre au premier rendu
*/
const useEffectNotOnFirstRender = (callBack: React.EffectCallback, deps?: React.DependencyList) => {
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    } else {
      callBack()
    }
  }, deps)
}

export default useEffectNotOnFirstRender
