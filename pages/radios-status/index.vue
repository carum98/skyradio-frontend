<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<IRadioStatus>('/api/radios-status')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/radios-status/create.vue'),
    props: {
        onCreated(_company: IRadioStatus) {
            refresh()
            close()
        }
    }
})
</script>

<template>
    <h1>Radio status</h1>
    <input v-model="search" type="search" />
    <button @click="OpenCreate">Create</button>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>