export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const data = await useApiFetch(event, `/clients`, {
        method: 'GET',
        query
    })

    return data as ITable<IClient>
})