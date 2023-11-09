<script setup lang="ts">
definePageMeta({
    name: 'sims-provider'
})

const { page, search, data, refresh } = await useTableData<ISimProvider>('/api/sims-provider')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/sims-provider/create.vue'),
    props: {
        onCreated(_client: ISimProvider) {
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