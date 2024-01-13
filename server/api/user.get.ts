import { getSession } from '../core/session'

export default defineEventHandler(async (event) => {
    const session = await getSession(event)

    if (!session.user) {
        throw new Error('No user found')
    }

    return session.user
})