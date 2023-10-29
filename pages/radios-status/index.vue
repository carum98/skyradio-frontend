<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<IRadioStatus>('/api/radios-status')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/radios-status/create.vue'),
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