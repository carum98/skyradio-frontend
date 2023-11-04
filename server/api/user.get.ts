export default defineEventHandler(async (event) => {
    const token = event.context.session?.user

    if (!token) {
        throw new Error('No user found')
    }

    return token
})