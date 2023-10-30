<script setup lang="ts" generic="T">
import type { SkTableProps, SkTableEmits, SkPaginationEmits } from './sk-table'

// Row type
type Row = T extends ITable<infer R> ? R : never

const { columns = [], loading = false } = defineProps<SkTableProps<T>>()

// data
const searchModel = defineModel<string>()

defineEmits<SkTableEmits<Row> & SkPaginationEmits>()
</script>

<template>
    <section class="sk-toolbar">
        <InputSearch 
            v-model="searchModel"
        />

        <slot name="toolbar" />
    </section>

    <SkTableBase 
        :data="table?.data ?? [] as any[]" 
        :columns="columns"
        :loading="loading"
    />
    <SkTablePagination 
        v-if="table?.pagination"
        :pagination="table.pagination" 
        @onPage="$emit('onPage', $event)" 
    />
</template>