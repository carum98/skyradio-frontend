import { ofetch, FetchOptions } from 'ofetch'
import { H3Event, sendRedirect } from 'h3'

const config = useRuntimeConfig()

const apiFetch = ofetch.create({ 
    baseURL: config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const useApiFetch = async (event: H3Event, request: RequestInfo, options?: FetchOptions) => {
    const token = event.context.session?.auth?.token

    if (!token) {
        await logout(event)
    }

    return apiFetch(request, {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await logout(event)
            }
        }
    })
}

async function logout(event: H3Event): Promise<void> {
    delete event.context.session.auth

    return await sendRedirect(event, '/login', 302)
}
