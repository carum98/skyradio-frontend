<script setup lang="ts">
definePageMeta({
    name: 'modalities'
})

const { page, search, data, refresh } = await useTableData<IModality>('/api/companies-modality')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/modalities/create.vue'),
    props: {
        onCreated(_company: IModality) {
            refresh()
            close()
        }
    }
})
</script>

<template>
<main>
    <SkTable
        :table="data" 
        v-model="search"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="OpenCreate">
                <IconsAdd />
            </button>
        </template>
    </SkTable>
</main>
</template>