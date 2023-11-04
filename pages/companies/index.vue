<script setup lang="ts">
const columns = [
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'Vendedor',
        key: 'seller',
    },
    {
        title: '',
        key: 'radios_count'
    }
]

const { page, search, data, refresh } = await useTableData<ICompany>('/api/companies')

const { open: OpenCreate, close } = useModal({
    component: import('@pages/companies/create.vue'),
    props: {
        onCreated(_company: ICompany) {
            refresh()
            close()
        }
    }
})

function openProfile(company: ICompany) {
    navigateTo({
        name: 'companies-profile',
        params: {
            code: company.code
        }
    })
}
</script>

<template>
<main>
    <SkTable
        :columns="columns"
        :table="data" 
        hover
        v-model="search"
        @onRowClick="openProfile"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="OpenCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell(name)="{ value, item }">
            <p>{{ value }}</p>
            <p>{{ item.modality.name }}</p>
        </template>

        <template #cell(seller)="{ value }">
            {{ value?.name ?? 'Sin vendedor' }}
        </template>
    </SkTable>
</main>
</template>