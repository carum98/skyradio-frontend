<script setup lang="ts" generic="T extends ITable<any>">
const props = defineProps<{
    table: T
}>()

defineEmits(['click-row'])
</script>

<template>
    <SkTableBase :items="props.table.data" @click-row="$emit('click-row', $event)" />
    <SkTablePagination :pagination="props.table.pagination" />
</template>