export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')
    const body = await readBody(event) 

    await useApiFetch(event, `/clients/${code}`, {
        method: 'PUT',
        body
    })

    return new Response(null, {
        status: 204
    })
})