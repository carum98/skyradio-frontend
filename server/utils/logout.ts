import { H3Event, sendRedirect } from 'h3'

export const useLogout = async (event: H3Event) => {
    delete event.context.session.auth
    delete event.context.session.user

    return await sendRedirect(event, '/login', 302)
}
