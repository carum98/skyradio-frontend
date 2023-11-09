export default defineEventHandler(async (event) => {
    const body = await readBody(event) 

    const data = await useApiFetch(event, `/clients`, {
        method: 'POST',
        body
    })

    return data as IClient
})