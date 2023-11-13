export async function useTableData<T>(path: string) {
    // data
    const page = ref(1)
    const search = ref('')

    const key = path.split('/').pop() as string

    // computed
    const searchPurified = computed(() => search.value || undefined)

    // methods
    const { data, refresh, pending } = useFetch<ITable<T>>(path, 
        {
            key,
            query: {
                page,
                search: searchPurified
            }
        }
    )

    return {
        data,
        search,
        page,
        refresh,
        pending
    }
}