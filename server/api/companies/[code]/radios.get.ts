export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')

    const data = await useApiFetch(event, `/companies/${code}/radios`, {
        method: 'GET',
    })

    return data
})