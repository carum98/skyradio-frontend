import { parseURL, parseQuery } from 'ufo'

export async function useTableData<T>(path: string) {
    const route = useRoute()

    // data
    const page = ref(Number(route.query.page) || 1)
    const search = ref(route.query.search as string || '')
    const query = ref<Record<string, any>>({})

    const url = parseURL(path)

    let key = url.pathname.split('/').pop()

    // Modify unique key, if the url has query params
    if (url.search) {
        const parsed = parseQuery(url.search)

        // Find a query params with a key containing 'code' to concatenate
        // to the key
        const code = Object.keys(parsed).find(key => key.includes('code'))

        if (code) {
            key += `-${parsed[code]}`
        }
    }

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