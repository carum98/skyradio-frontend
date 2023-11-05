<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table';

const columns: SkTableColumn[] = [
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'Vendedor',
        key: 'seller',
        width: 300,
        align: 'center',
        formatter: (seller: ISeller | null) => seller?.name ?? '-'
    },
    {
        title: 'Modalidad',
        key: 'modality',
        width: 300,
        align: 'center',
        formatter: (modality: IModality) => modality.name
    },
    {
        title: '',
        key: 'radios_count',
        width: 100,
        align: 'center',
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

        <template #cell(radios_count)="{ item }">
            <span class="counter">{{ item.radios_count }}</span>
        </template>
    </SkTable>
</main>
</template>