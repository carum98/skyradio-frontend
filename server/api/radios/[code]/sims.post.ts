export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')
    const body = await readBody(event) 

    await useApiFetch(event, `/radios/${code}/sims`, {
        method: 'POST',
        body
    })

    return new Response(null, {
        status: 204
    })
})