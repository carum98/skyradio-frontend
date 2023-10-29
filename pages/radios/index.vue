<script setup lang="ts">
const { page, data, pending, search, refresh } = await useTableData<IRadio>('/api/radios')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/radios/create.vue'),
    props: {
        onCreated(_company: IRadio) {
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
        @click-row="$router.push({ name: 'radios-profile', params: { code: $event.code } })"
        @onPage="page = $event"
    />
</template>