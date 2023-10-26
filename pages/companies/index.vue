<script setup lang="ts">
const { data, pending, refresh } = await useFetch<ITable<ICompany>>('/api/companies')

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
        v-if="!pending"
        :table="data!" 
        @click-row="$router.push({ name: 'companies-profile', params: { code: $event.code } })"
    />
</template>