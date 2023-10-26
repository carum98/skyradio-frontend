<script setup lang="ts">
const { data, pending } = await useFetch<ITable<ICompany>>('/api/companies')

function create() {
    useModal({
        component: import('../pages/companies/create.vue'),
        props: {
        }
    })
}
</script>

<template>
    <h1>Companies</h1>
    <button @click="create">Create</button>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @click-row="$router.push({ name: 'companies-profile', params: { code: $event.code } })"
    />
</template>