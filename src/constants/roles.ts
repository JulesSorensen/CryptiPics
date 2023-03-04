export enum Roles {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

export const roleLabels: Record<string, string> = {
  [Roles.USER]: 'Membre',
  [Roles.ADMIN]: 'Administrateur',
}

export const roleOptions = Object.keys(roleLabels).map(key => {
  return {
    label: roleLabels[key],
    value: key
  }
})