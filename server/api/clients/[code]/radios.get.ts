export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const code = getRouterParam(event, 'code')

    const data = await useApiFetch(event, `/clients/${code}/radios`, {
        method: 'GET',
        query
    })

    return data as ITable<IRadio>
})