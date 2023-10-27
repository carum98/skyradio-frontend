<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<IModality>('/api/companies-modality')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/modalities/create.vue'),
    props: {
        onCreated(_company: IModality) {
            refresh()
            close()
        }
    }
})
</script>

<template>
    <h1>Modalidades</h1>
    <input v-model="search" type="search" />
    <button @click="OpenCreate">Create</button>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>