export async function useTableData<T>(path: string) {
    const page = ref(1)

    const key = path.split('/').pop() as string

    const { data, refresh, pending } = await useAsyncData<ITable<T>>(
        key,
        async () => $fetch(path, {
            query: {
                page: page.value
            }
        }),
        {
            watch: [page]
        }
    )

    return {
        data,
        page,
        refresh,
        pending
    }
}