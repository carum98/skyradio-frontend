export async function useTableData<T>(path: string) {
    const page = ref(1)
    const search = ref('')

    const key = path.split('/').pop() as string

    const { data, refresh, pending } = await useAsyncData<ITable<T>>(
        key,
        async () => $fetch(path, {
            query: {
                page: page.value || undefined,
                search: search.value || undefined
            }
        }),
        {
            watch: [page, search]
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