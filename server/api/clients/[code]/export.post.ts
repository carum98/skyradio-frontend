export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')
    const body = await readBody(event) 

    return await useApiFetch(event, `/api/clients/${code}/export`, {
        method: 'POST',
        body
    })
})