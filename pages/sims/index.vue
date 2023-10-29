<script setup lang="ts">
const { page, search, data, refresh } = await useTableData<ISim>('/api/sims')

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