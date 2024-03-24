import { parseURL } from 'ufo'

export async function useTableData<T>(path: string) {
    const route = useRoute()

    // data
    const page = ref(Number(route.query.page) || 1)
    const search = ref(route.query.search as string || '')
    const query = ref<Record<string, any>>({})

    const key = parseURL(path).pathname.split('/').pop()

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