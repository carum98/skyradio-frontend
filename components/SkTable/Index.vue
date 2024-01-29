<script setup lang="ts" generic="T">
import type { SkTableProps, SkTableEmits, SkTableSlots } from './sk-table'

// Row type
type Row = T extends ITable<infer R> ? R : never

const { table, columns = [], loading = false } = defineProps<SkTableProps<T>>()

defineEmits<SkTableEmits<Row>>()
defineSlots<SkTableSlots<T>>()

// data
const search = defineModel<string>('search')
const page = defineModel<number>('page')

// computed
const data = computed(() => {
    if (table?.data) {
        return table.data
    }

    return []
}) as ComputedRef<any[]>

</script>

<template>
    <section class="sk-toolbar">
        <InputSearch v-model="search"/>

        <slot name="toolbar" />

        <slot name="actions" />
    </section>

    <SkTableBaseGrid
        v-if="gridView"
        :data="data" 
        :hover="hover"
        @onRowClick="$emit('onRowClick', $event)"
    >
        <template #cell="{ item }">
            <slot name="cell" :item="item" />
        </template>
    </SkTableBaseGrid>

    <SkTableBase 
        v-else
        :data="data" 
        :columns="columns"
        :loading="loading"
        :hover="hover"
        @onRowClick="$emit('onRowClick', $event)"
    >
        <template v-for="(_, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData" />
        </template>
    </SkTableBase>

    <SkTablePagination 
        v-if="table?.pagination"
        :pagination="table.pagination"
        v-model="page"
    />
</template>