<script setup lang="ts" generic="T extends ITable<any>">
const props = defineProps<{
    table: T | null
}>()

// data
const searchModel = defineModel<string>()

// Row type
type Row = T extends ITable<infer R> ? R : never

const emit = defineEmits<{
    clickRow: [row: Row]
    onPage: [page: number]
}>()
</script>

<template>
    <section class="sk-toolbar">
        <InputSearch 
            v-model="searchModel"
        />

        <slot name="toolbar" />
    </section>

    <SkTableBase 
        :items="props.table?.data ?? []" 
        @clickRow="$emit('clickRow', $event)" 
    />
    <SkTablePagination 
        v-if="props.table?.pagination"
        :pagination="props.table.pagination" 
        @onPage="$emit('onPage', $event)" 
    />
</template>