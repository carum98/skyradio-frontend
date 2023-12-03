<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const props = defineProps<{
    onApplied: (query: Record<string, any>) => void
    columns: SkTableColumn[]
}>()

const { open: openColumns } = usePopover({
    component: () => import('@views/table-columns.vue'),
    props: {
        columns: props.columns
    }
})

const { open: openFilters } = usePopover({
    component: () => import('@views/table-filters.vue'),
    listeners: {
        onApplied: props.onApplied
    }
})

const { open: openSort } = usePopover({
    component: () => import('@views/table-sort.vue'),
    props: {
        fields: [
            { key: 'name', title: 'Nombre' },
            { key: 'radios_count', title: 'Cantidad de radios' },
            { key: 'created_at', title: 'Fecha de creación' },
            { key: 'updated_at', title: 'Fecha de actualización' }
        ]
    },
    listeners: {
        onApplied: props.onApplied
    }
})
</script>

<template>
    <TableActions
        @onFilters="openFilters"
        @onSort="openSort"
        @onColumns="openColumns"
    />
</template>