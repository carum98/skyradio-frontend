<script setup lang="ts">
const { page, data, search, refresh } = await useTableData<IRadio>('/api/radios')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/radios/create.vue'),
    props: {
        onCreated(_company: IRadio) {
            refresh()
            close()
        }
    }
})

function openProfile(radio: IRadio) {
    navigateTo({
        name: 'radios-profile',
        params: {
            code: radio.code
        }
    })
}
</script>

<template>
<main>
    <SkTable 
        :table="data"
        v-model="search"
        hover
        @onRowClick="openProfile"
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