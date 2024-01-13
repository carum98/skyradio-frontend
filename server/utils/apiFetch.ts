import { ofetch, type FetchOptions } from 'ofetch'
import { H3Event, createError } from 'h3'
import { getSession } from '../core/session'

const config = useRuntimeConfig()

const apiFetch = ofetch.create({ 
    baseURL: config.apiBaseUrl, 
    headers: {
        'Content-Type': 'application/json'
    }
})

export const useApiFetch = async (event: H3Event, request: RequestInfo, options?: FetchOptions) => {
    const session = await getSession(event)
    const token = session.auth.token

    if (!token) {
        await useLogout(event)
    }

    return apiFetch(request, {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        async onResponseError({ response, error }) {
            if (response.status === 401) {
                await useLogout(event)
            } else {
                sendError(event, createError({
                    statusCode: response.status,
                    data: response._data,
                    stack: error?.stack
                }))
            }
        }
    })
}

