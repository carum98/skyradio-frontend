<script setup lang="ts">
const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/radios-model/create.vue'),
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