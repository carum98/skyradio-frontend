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
    <section class="sk-toolbar">
        <input v-model="search" type="search" />
        <button class="add-button" @click="OpenCreate">
            <IconsAdd />
        </button>
    </section>
    <SkTable
        v-if="!pending"
        :table="data!" 
        @onPage="page = $event"
    />
</template>