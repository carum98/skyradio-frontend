interface IUser {
    code: string 
    email: string
    name: string
    role: Role
    group: {
        id: number
        name: string
    }
}