export default defineEventHandler(async (event) => {
    const body = await readBody(event) 

    const data = await useApiFetch(event, `/companies-seller`, {
        method: 'POST',
        body
    })

    return data as ISeller
})