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
    <section class="sk-toolbar">
        <input v-model="search" type="search" />
        <button class="add-button" @click="OpenCreate">
            <IconsAdd />
        </button>
    </section>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>