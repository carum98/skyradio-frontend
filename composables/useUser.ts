export const useUser = () => useState<IUser | null>('user', () => {
    const user = useFetch<IUser>('/api/user', {
        getCachedData: (key, nuxt) => nuxt.payload.data[key] || nuxt.static.data[key],
    })

    return user.data || null
})