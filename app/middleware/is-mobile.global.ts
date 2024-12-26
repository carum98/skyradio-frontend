export default defineNuxtRouteMiddleware(async (ctx) => {
    if (process.client) return

    const { name } = ctx
    if (name === 'mobile') return

    const event = useRequestEvent()

    if (!event) return

    const headers = useRequestHeaders()

    const userAgent = headers['user-agent']

    if (userAgent) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

        if (isMobile) {
            return navigateTo('/mobile')
        }
    }
})