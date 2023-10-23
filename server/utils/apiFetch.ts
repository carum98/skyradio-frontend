import { ofetch } from 'ofetch'

const config = useRuntimeConfig()

export const apiFetch = ofetch.create({ 
    baseURL: config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})