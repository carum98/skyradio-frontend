<script setup lang="ts">
definePageMeta({
    name: 'sellers'
})

const { page, search, data, refresh } = await useTableData<ISeller>('/api/sellers')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/sellers/create.vue'),
    props: {
        onCreated(_client: ISeller) {
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