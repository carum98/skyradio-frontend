export interface LoginResponse {
    token: string
    refreshToken: string
    expiredAt: number
    user: {
        id: string
        email: string
        name: string
        role: string
    }
}

export type SessionData = {
    auth: Omit<LoginResponse, 'user'>
    user: LoginResponse['user']
}
