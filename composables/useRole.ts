export function useRole() {
    const user = useUser()
    const role = unref(user)?.role

    function is(value: string) {
        return value === role
    }

    function isNot(value: string) {
        return value !== role
    }

    return {
        is,
        isNot,
        isAdmin: is('admin'),
        isUser: is('user'),
        isGuest: is('guest'),
        isSeller: is('seller'),
    }
}