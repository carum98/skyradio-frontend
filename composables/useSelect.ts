export function useSelect<T>(path: string) {
    let page = 1
    const items = ref<T[]>([]) as Ref<T[]>

    async function onData() {
        const { data, pagination } = await $fetch<ITable<T>>(path, {
            params: {
                page
            }
        })

        page = pagination.page + 1
        items.value.push(...data)
    }

    return {
        items,
        onData
    }
}