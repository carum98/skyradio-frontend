export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const data = await useApiFetch(event, `/companies-seller`, {
        method: 'GET',
        query
    })

    return data as ITable<IModality>
})