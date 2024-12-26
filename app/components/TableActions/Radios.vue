<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'
import type { TableActionsProps } from './Index.vue'
import { useTableActions } from '@components/TableActions/useTableActions'

const props = defineProps<{
    columns: SkTableColumn[]
} & TableActionsProps>()

const emits = defineEmits<{
    onApplied: [Record<string, any>]
}>()

const { state, onAppliedSort, onAppliedFilters } = useTableActions(emits)

// methods
function onFilter(anchor: HTMLButtonElement) {
    usePopover({
        component: () => import('@views/table-filters-radios.vue'),
        props: {
            inital: state.filters.raw,
        },
        listeners: {
            onApplied: onAppliedFilters,
        }
    }).open({
        rootProps: {
            anchor
        }
    })
}

function onSort(anchor: HTMLButtonElement) {
    usePopover({
        component: () => import('@views/table-sort.vue'),
        props: {
            inital: state.filters.raw,
        },
        listeners: {
            onApplied: onAppliedSort,
        }
    }).open({
        rootProps: {
            anchor
        }
    })
}

function onColumns(anchor: HTMLButtonElement) {
    usePopover({
        component: () => import('@views/table-columns.vue'),
        props: {
            columns: props.columns
        }
    }).open({
        rootProps: {
            anchor
        }
    })
}
</script>

<template>
    <TableActions
        :hideStatsButton="hideStatsButton"
        @onFilters="onFilter"
        @onSort="onSort"
        @onColumns="onColumns"
    ></TableActions>
</template>