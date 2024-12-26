import { getSession } from '@/server/core/session'

export default defineNuxtRouteMiddleware(async (ctx) => {
    const { meta: { roles } } = ctx as { meta: { roles?: Role[] } }
    let role: Role | undefined

    if (!roles) return

    if (process.client) {
        const user = useUser()
        if (!user.value) return 

        role = unref(user.value?.role)
    }

    if (process.server) {
        const event = useRequestEvent()
        if (!event) return

        const session = await getSession(event)
        role = session.user.role
    }

    if (!role) return

    // Check if the user has the required role
    if (!roles.some(r => r === role)) {
        const error = { statusCode: 403, message: 'Permiso denegado' }

        if (process.client) {
            showError(error)
        }

        return abortNavigation(error)
    }
})