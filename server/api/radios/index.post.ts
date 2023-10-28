export default defineEventHandler(async (event) => {
    const body = await readBody(event) 

    const data = await useApiFetch(event, `/radios`, {
        method: 'POST',
        body
    })

    return data as IRadio
})