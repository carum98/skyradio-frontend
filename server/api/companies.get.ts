export default defineEventHandler(async (event) => {
    const token = event.context.session?.auth?.token

    const data = await apiFetch(`/companies`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return data
})