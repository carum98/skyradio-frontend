import { H3Event } from 'h3'
import { getSession, setSession } from '../core/session'
import type { LoginResponse } from '../core/types'

export async function useToken(event: H3Event): Promise<String | null> {
    const session = await getSession(event)

    if (!session.auth.token) {
        return null
    }

    if (session.auth.expiredAt < Date.now()) {
        console.log('useRefreshToken')
        return await useRefreshToken(event, session.auth.refreshToken)
    }

    return session.auth.token
}

async function useRefreshToken(event: H3Event, refresh_token: String): Promise<String | null> {
    try {
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

        return tokenInfo.token
    } catch (error) {
        return null
    }
}
