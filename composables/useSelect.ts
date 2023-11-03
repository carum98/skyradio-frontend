export function useSelect<T>(path: string) {
    let page = 1

    const items = ref<T[]>([]) as Ref<T[]>
    const search = useDebounce('', 500)

    async function onData() {
        const { data, pagination } = await $fetch<ITable<T>>(path, {
            params: {
                page,
                search: search.value
            }
        })

        page = pagination.page + 1
        items.value.push(...data)
    }

    watch(search, () => {
        page = 1
        console.log('search', search.value)
        items.value = []
        onData()
    })

    return {
        items,
        search,
        onData
    }
}