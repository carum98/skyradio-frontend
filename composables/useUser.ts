export const useUser = () => useState<IUser | null>('user', () => {
    const user = useFetch<IUser>('/api/user')

    return user.data || null
})