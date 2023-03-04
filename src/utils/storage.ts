export const save = (name: string, value: any) => {
  const newValue = JSON.stringify(value)
  localStorage.setItem(name, newValue)
}

export const get = (name: string) => {
  const value = localStorage.getItem(name)

  if (!value) return false

  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export const destroy = (name: string) => {
  localStorage.removeItem(name)
}
