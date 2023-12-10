export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')
    const body = await readBody(event) 

    return await useApiFetch(event, `/clients/${code}/export`, {
        method: 'POST',
        body
    })
})