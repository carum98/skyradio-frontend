<script setup lang="ts">
definePageMeta({
    name: 'radios-status'
})

const { page, search, data, refresh } = await useTableData<IRadioStatus>('/api/radios-status')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/radios-status/create.vue'),
    props: {
        onCreated(_company: IRadioStatus) {
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