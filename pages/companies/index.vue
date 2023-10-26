<script setup lang="ts">
const { data, pending, refresh } = await useFetch<ITable<ICompany>>('/api/companies')

function create() {
    useModal({
        component: import('../pages/companies/create.vue'),
        props: {
            onCreated(company: ICompany) {
                console.log(company)
                refresh()
            }
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