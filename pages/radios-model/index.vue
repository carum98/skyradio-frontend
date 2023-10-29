<script setup lang="ts">
const { page, search, data, refresh, pending } = await useTableData<IRadioModel>('/api/radios-model')

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
    </main>
</template>