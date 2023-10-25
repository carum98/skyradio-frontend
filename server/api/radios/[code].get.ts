export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')

    const data = await useApiFetch(event, `/radios/${code}`, {
        method: 'GET',
    })

    return data
})
