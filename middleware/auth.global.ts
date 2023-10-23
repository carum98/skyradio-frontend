export default defineNuxtRouteMiddleware(async (ctx) => {
    if (process.client) return

    const { name } = ctx

    // get session from context
    const event = useRequestEvent()
    const { session } = event.context

    // redirect to /login if session is not set
    if (!session?.auth && name !== 'login') {
        return navigateTo('/login')
    } else if (session?.auth && name === 'login') {
        return navigateTo('/')
    }
})