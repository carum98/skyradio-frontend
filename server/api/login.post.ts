interface LoginResponse {
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

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    const config = useRuntimeConfig()

    const data = await $fetch<LoginResponse>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        baseURL: config.apiBaseUrl,
    })

    const { user, ...tokenInfo } = data

    // Save token session
    event.context.session.auth = tokenInfo
    event.context.session.user = user

    return {
        success: true,
    }
})