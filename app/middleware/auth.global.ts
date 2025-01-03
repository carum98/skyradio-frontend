import { getSession } from "@/server/core/session"

export default defineNuxtRouteMiddleware(async (ctx) => {
    if (process.client) return

    // get session from context
    const event = useRequestEvent()
    if (!event) return

    const session = await getSession(event)

    const { name } = ctx

    // Whitelist pages
    if (name === 'mobile') return

    // redirect to /login if session is not set
    if (!session?.auth && name !== 'login') {
        return navigateTo('/login')
    } else if (session?.auth && name === 'login') {
        return navigateTo('/')
    }
})