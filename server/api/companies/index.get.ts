export default defineEventHandler(async (event) => {
    const data = await useApiFetch(event, `/companies`, {
        method: 'GET',
    })

    return data
})