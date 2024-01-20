import { setSession } from '../core/session'
import type { LoginResponse } from '../core/types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { refresh_token } = body

    const config = useRuntimeConfig()

    const data = await $fetch<LoginResponse>('/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refresh_token }),
        baseURL: config.apiBaseUrl,
    })

    const { user, ...tokenInfo } = data

    await setSession(event, {
        auth: tokenInfo,
        user: user,
    })

    return {
        token: tokenInfo.token,
    }
})