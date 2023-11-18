export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const data = await useApiFetch(event, `/radios`, {
        method: 'GET',
        query
    })

    return data as ITable<IRadio>
})