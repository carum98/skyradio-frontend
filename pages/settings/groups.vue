<script setup lang="ts">
useHead({
  title: 'Grupos',
})

definePageMeta({
    name: 'groups'
})

const { page, data, search } = await useTableData<IGroup>('/api/groups')
</script>

<template>
<main>
    <SkTable 
        gridView
        :table="data"
        v-model:search="search"
        v-model:page="page"
        @onPage="page = $event"
    >
        <template #cell="{ item }">
            {{ item.name }}
        </template>
    </SkTable>
</main>
</template>