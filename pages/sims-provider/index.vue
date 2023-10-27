<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<ISimProvider>('/api/sims-provider')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/sims-provider/create.vue'),
    props: {
        onCreated(_company: ISimProvider) {
            refresh()
            close()
        }
    }
})
</script>

<template>
    <h1>Proveedores de Sims</h1>
    <input v-model="search" type="search" />
    <button @click="OpenCreate">Create</button>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>