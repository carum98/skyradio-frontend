<script setup lang="ts">
useHead({
  title: 'Usuarios',
})

definePageMeta({
    name: 'users'
})

const { page, data, search, refresh } = await useTableData<IUser>('/api/users')
</script>

<template>
<main>
    <SkTable 
        :table="data"
        v-model:search="search"
        v-model:page="page"
        hover
    ></SkTable>
</main>
</template>