export default defineEventHandler(async (event) => {
    const data = await useApiFetch(event, `/radios`, {
        method: 'GET',
    })

    return data
})