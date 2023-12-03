export async function useTableData<T>(path: string) {
    // data
    const page = ref(1)
    const search = ref('')
    const query = ref<Record<string, any>>({})

    const key = path.split('/').pop() as string

    // computed
    const searchPurified = computed(() => search.value || undefined)
    const queryParams = computed(() => {
        return {
            ...query.value,
            page: page.value,
            search: searchPurified.value
        }
    })

    // methods
    const { data, refresh, pending } = useFetch<ITable<T>>(path, 
        {
            key,
            query: queryParams
        }
    )

    return {
        data,
        search,
        page,
        refresh,
        pending,
        query
    }
}