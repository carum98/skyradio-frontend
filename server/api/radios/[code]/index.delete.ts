export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')

    await useApiFetch(event, `/radios/${code}`, {
        method: 'DELETE',
    })

    return new Response(null, {
        status: 204
    })
})