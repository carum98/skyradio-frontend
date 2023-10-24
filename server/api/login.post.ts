interface LoginResponse {
    token: string
    refreshToken: string
    expiredAt: number
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    const config = useRuntimeConfig()

    const data = await $fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        baseURL: config.apiBaseUrl,
    })

    // Save token session
    event.context.session.auth = data

    return data as LoginResponse
})