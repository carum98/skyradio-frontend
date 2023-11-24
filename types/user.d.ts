declare global {
    interface IUser {
        code: string 
        email: string
        name: string
        role: 'admin' | 'user'
        group: {
            id: number
            name: string
        }
    }
}

export {}