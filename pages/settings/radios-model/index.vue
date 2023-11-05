<script setup lang="ts">
definePageMeta({
    name: 'radios-model'
})

const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/radios-model/create.vue'),
    props: {
        onCreated(_company: IRadioModel) {
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