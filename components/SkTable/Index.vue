<script setup lang="ts" generic="T extends ITable<any>">
const props = defineProps<{
    table: T
}>()

// Row type
type Row = T extends ITable<infer R> ? R : never

const emit = defineEmits<{
    (e: 'clickRow', row: Row): void
    (e: 'onPage', page: number): void
}>()
</script>

<template>
    <SkTableBase 
        :items="props.table.data" 
        @clickRow="$emit('clickRow', $event)" 
    />
    <SkTablePagination 
        :pagination="props.table.pagination" 
        @onPage="$emit('onPage', $event)" 
    />
</template>