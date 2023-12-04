<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'
import { useTableActions } from '@components/TableActions/useTableActions'

const props = defineProps<{
    columns: SkTableColumn[]
}>()

const emits = defineEmits<{
    onApplied: [Record<string, any>]
}>()

const { state, onAppliedSort, onAppliedFilters } = useTableActions(emits)

// methods
const { open: openColumns } = usePopover({
    component: () => import('@views/table-columns.vue'),
    props: {
        columns: props.columns
    }
})

const { open: openFilters } = usePopover({
    component: () => import('@views/table-filters-radios.vue'),
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