export async function useTableData<T>(path: string) {
    const page = ref(1)
    const search = ref('')

    const key = path.split('/').pop() as string

    const { data, refresh, pending } = useFetch<ITable<T>>(path, 
        {
            key,
            query: {
                page,
                search
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