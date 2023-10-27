<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<ISim>('/api/sims')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/sims/create.vue'),
    props: {
        onCreated(_company: ISim) {
            refresh()
            close()
        }
    }
})
</script>

<template>
    <h1>Sims</h1>
    <input v-model="search" type="search" />
    <button @click="OpenCreate">Create</button>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>