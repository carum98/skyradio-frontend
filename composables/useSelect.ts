export function useSelect<T>(path: string) {
    const search = useDebounce('', 500)

    const { data, pending: loading, refresh: onData } = useFetch<ITable<T>>(path, {
        query: {
            search
        },
        immediate: false,
        pick: ['data']
    })

    const items = computed(() => data.value?.data ?? [])

    return {
        items,
        search,
        loading,
        onData
    }
}