export default defineEventHandler(async (event) => {
    const body = await readBody(event) 

    const data = await useApiFetch(event, `/companies-modality`, {
        method: 'POST',
        body
    })

    return data as IModality
})