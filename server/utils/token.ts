import { H3Event } from 'h3'
import { getSession } from '../core/session'

export async function useToken(event: H3Event): Promise<String | null> {
    const session = await getSession(event)

    if (!session.auth.token) {
        return null
    }

    if (session.auth.expiredAt < Date.now()) {
        console.log('useRefreshToken')
        return await useRefreshToken(session.auth.refreshToken)
    }

    return session.auth.token
}

async function useRefreshToken(refresh_token: String): Promise<String | null> {
    try {
        const response = await $fetch('/api/refresh', {
            method: 'POST',
            body: {
                refresh_token,
            }
        })

        return response.token
    } catch (error) {
        return null
    }
}