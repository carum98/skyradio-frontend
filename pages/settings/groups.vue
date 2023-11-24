<script setup lang="ts">
definePageMeta({
    name: 'groups'
})

const { page, data, search, refresh } = await useTableData<IGroup>('/api/groups')
</script>

<template>
<main>
    <SkTable 
        gridView
        :table="data"
        v-model="search"
        hover
        @onPage="page = $event"
    ></SkTable>
</main>
</template>