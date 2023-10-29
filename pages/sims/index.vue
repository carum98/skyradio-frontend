<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<ISim>('/api/sims')

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
    <section class="sk-toolbar">
        <InputSearch v-model="search" />
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