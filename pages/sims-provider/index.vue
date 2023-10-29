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