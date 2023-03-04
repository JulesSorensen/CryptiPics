export const darkModeListener = (onChange: (enabled: boolean) => void) => {
  const elemToObserve = document.documentElement
  let prevClassState = elemToObserve.classList.contains('dark')

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName == 'class') {
        // @ts-ignore
        const currentClassState = mutation.target.classList.contains('dark')

        if (prevClassState !== currentClassState) {
          prevClassState = currentClassState

          if (currentClassState) {
            onChange(true)
          } else {
            onChange(false)
          }
        }
      }
    })
  })

  observer.observe(elemToObserve, { attributes: true })

  return observer
}
