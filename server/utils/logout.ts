import { H3Event, sendRedirect } from 'h3'
import { clearSession } from '../core/session'

export const useLogout = async (event: H3Event) => {
    await clearSession(event)

    return await sendRedirect(event, '/login', 302)
}
