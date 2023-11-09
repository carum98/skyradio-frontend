<script setup lang="ts">
definePageMeta({
    name: 'modalities'
})

const { page, search, data, refresh } = await useTableData<IModality>('/api/clients-modality')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/modalities/create.vue'),
    props: {
        onCreated(_client: IModality) {
            refresh()
            close()
        }
    }
})
</script>

<template>
<main>
    <SkTable
        gridView
        :table="data" 
        v-model="search"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="OpenCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell="{ item }">
            {{ item.name }}
        </template>
    </SkTable>
</main>
</template>