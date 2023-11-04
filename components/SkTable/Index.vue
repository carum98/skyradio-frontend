<script setup lang="ts" generic="T">
import type { SkTableProps, SkTableEmits, SkPaginationEmits, SkTableSlots } from './sk-table'

// Row type
type Row = T extends ITable<infer R> ? R : never

const { columns = [], loading = false } = defineProps<SkTableProps<T>>()

defineEmits<SkTableEmits<Row> & SkPaginationEmits>()
defineSlots<SkTableSlots<T>>()

// data
const searchModel = defineModel<string>()

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
    >
        <template v-for="(_, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData" />
        </template>
    </SkTableBase>

    <SkTablePagination 
        v-if="table?.pagination"
        :pagination="table.pagination" 
        @onPage="$emit('onPage', $event)" 
    />
</template>