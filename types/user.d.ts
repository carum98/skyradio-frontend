declare global {
    interface IUser {
        id: number
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