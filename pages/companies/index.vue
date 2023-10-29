<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<ICompany>('/api/companies')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/companies/create.vue'),
    props: {
        onCreated(_company: ICompany) {
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
        @click-row="$router.push({ name: 'companies-profile', params: { code: $event.code } })"
        @onPage="page = $event"
    />
</template>