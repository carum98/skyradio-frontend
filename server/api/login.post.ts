interface LoginResponse {
    token: string
    refreshToken: string
    expiredAt: number
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    const data = await $fetch('http://192.168.10.197:8080/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })

    // Save token session
    event.context.session.auth = data

    return data as LoginResponse
})