export interface LoginResponse {
    token: string
    refreshToken: string
    expiredAt: number
    user: IUser
}

export type SessionData = {
    auth: Omit<LoginResponse, 'user'>
    user: LoginResponse['user']
}
