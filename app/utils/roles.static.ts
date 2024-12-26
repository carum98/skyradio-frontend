export const Roles = [
    { name: 'Administrador', value: 'admin' },
    { name: 'Invitado', value: 'guest' },
    { name: 'Vendedor', value: 'seller' },
    { name: 'Usuario', value: 'user' },
] as IRole[]

export function getRoleByValue(value: string) {
    return Roles.find(role => role.value === value) || Roles[0]
}
