<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<ISeller>('/api/companies-seller')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/sellers/create.vue'),
    props: {
        onCreated(_company: ISeller) {
            refresh()
            close()
        }
    }
})
</script>

<template>
    <h1>Vendedores</h1>
    <input v-model="search" type="search" />
    <button @click="OpenCreate">Create</button>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>