<script setup lang="ts">
const props = defineProps<{
    onApplied: (query: Record<string, any>) => void
}>()

const { open: openColumns } = usePopover({
    component: () => import('@views/table-columns.vue'),
})

const { open: openFilters } = usePopover({
    component: () => import('@views/table-filters.vue'),
    listeners: {
        onApplied: props.onApplied
    }
})

const { open: openSort } = usePopover({
    component: () => import('@views/table-sort.vue'),
    listeners: {
        onApplied: props.onApplied
    }
})
</script>

<template>
    <div class="table-action-buttons">
        <button @click="openFilters(null, { anchor: $event.target })">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20h-2Z"/></svg>
            Filtros
        </button>
        <button @click="openSort(null, { anchor: $event.target })">
            <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 9l3-3l3 3M5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5zM17 6v12"/></svg>
            Ordenar
        </button>
        <button @click="openColumns(null, { anchor: $event.target })">
            <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm8-2v16"/></svg>
            Columnas
        </button>
    </div>
</template>

<style scoped>
.table-action-buttons {
    margin-left: auto;
    display: flex;
    gap: 10px;

    & button {
        background-color: var(--table-color);
        color: var(--text-color);
        border-radius: 15px;
        padding: 10px 15px;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        gap: 5px;

        & svg {
            width: 20px;
            height: 20px;
            user-select: none;
        }
    }
}
</style>