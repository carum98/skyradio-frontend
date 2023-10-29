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