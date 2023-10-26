<script setup lang="ts">
const { page, data, refresh, pending } = await useTableData<ICompany>('/api/companies')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/companies/create.vue'),
    props: {
        onCreated(_company: ICompany) {
            refresh()
            close()
        }
    }
})
</script>

<template>
    <h1>Companies</h1>
    <button @click="OpenCreate">Create</button>
    <SkTable
        :pending="!pending"
        :table="data!" 
        @click-row="$router.push({ name: 'companies-profile', params: { code: $event.code } })"
        @onPage="page = $event"
    />
</template>