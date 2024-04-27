import { setSession } from '../core/session'
import type { LoginResponse } from '../core/types'

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

    await setSession(event, {
        auth: tokenInfo,
        user: user,
    })

    return user
})