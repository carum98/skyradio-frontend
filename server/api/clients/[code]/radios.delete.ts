export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')
    const body = await readBody(event) 

    await useApiFetch(event, `/clients/${code}/radios`, {
        method: 'DELETE',
        body
    })

    return new Response(null, {
        status: 204
    })
})