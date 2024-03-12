export default defineEventHandler(async (event) => {
    const token = await useToken(event)
    const config = useRuntimeConfig()

    const files = await readMultipartFormData(event)

    const body = new FormData()
    const file = files?.at(0)

    if (file !== undefined) {
        body.append('file', new Blob([file.data], { type: file.type }), file.filename)
    }

    const data = fetch(`${config.apiBaseUrl}/sims/imports`, {
        method: 'POST',
        body,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    return data
})