import { ofetch, type FetchOptions } from 'ofetch'
import { H3Event, createError } from 'h3'

const config = useRuntimeConfig()

const apiFetch = ofetch.create({ 
    baseURL: config.apiBaseUrl, 
    headers: {
        'Content-Type': 'application/json'
    }
})

export const useApiFetch = async (event: H3Event, request: RequestInfo, options?: FetchOptions) => {
    console.log('useApiFetch event', event)
    const token = event.context.session?.auth?.token

    console.log('useApiFetch token', token)

    if (!token) {
        await useLogout(event)
    }

    return apiFetch(request, {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        async onResponseError({ response, error }) {
            console.log('onResponseError response', response)
            console.log('onResponseError error', error)
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

