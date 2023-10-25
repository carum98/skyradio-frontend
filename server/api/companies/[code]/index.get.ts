export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code')

    const data = await useApiFetch(event, `/companies/${code}`, {
        method: 'GET',
    })

    return data as ICompany
})
