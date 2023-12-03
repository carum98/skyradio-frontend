<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

type State = {
    raw: Record<string, any> | null,
    query: Record<string, any> | null,
}

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

const props = defineProps<{
    columns: SkTableColumn[]
}>()

const emits = defineEmits<{
    onApplied: [Record<string, any>]
}>()

// methods
const { open: openColumns } = usePopover({
    component: () => import('@views/table-columns.vue'),
    props: {
        columns: props.columns
    }
})

const { open: openFilters } = usePopover({
    component: () => import('@views/table-filters.vue'),
    listeners: {
        onApplied: onAppliedFilters,
    }
})

const { open: openSort } = usePopover({
    component: () => import('@views/table-sort.vue'),
    listeners: {
        onApplied: onAppliedSort,
    }
})

function onAppliedSort(query: Record<string, any>, form: any) {
    state.sort.query = query
    state.sort.raw = form

    onApplied()
}

function onAppliedFilters(query: Record<string, any>, form: any) {
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
</script>

<template>
    <TableActions
        @onFilters="openFilters({ 
            ...$event,
            props: {
                inital: state.filters.raw,
            }
        })"
        @onSort="openSort({ 
            ...$event,
            props: {
                inital: state.sort.raw,
            }
        })"
        @onColumns="openColumns"
    />
</template>