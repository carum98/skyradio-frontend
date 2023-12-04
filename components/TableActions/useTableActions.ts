type State = {
    raw: Record<string, any> | null,
    query: Record<string, string> | null,
}

export function useTableActions(emits: any) {
    // data
    const state: Record<string, State> = {
        filters: {
            raw: null,
            query: null,
        },
        sort: {
            raw: null,
            query: null,
        }
    }

    // methods
    function onAppliedSort(query: Record<string, string>, form: any) {
        state.sort.query = query
        state.sort.raw = form
    
        onApplied()
    }
    
    function onAppliedFilters(query: Record<string, string>, form: any) {
        state.filters.query = query
        state.filters.raw = form
    
        onApplied()
    }
    
    function onApplied() {
        let query = {
            ...state.filters.query,
            ...state.sort.query,
        }
    
        emits('onApplied', query)
    }

    return {
        state,
        onAppliedSort,
        onAppliedFilters,
    }
}