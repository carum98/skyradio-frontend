<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<IRadioModel>('/api/radios-model')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/radios-model/create.vue'),
    props: {
        onCreated(_company: IRadioModel) {
            refresh()
            close()
        }
    }
})
</script>

<template>
    <h1>Radio Models</h1>
    <input v-model="search" type="search" />
    <button @click="OpenCreate">Create</button>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>