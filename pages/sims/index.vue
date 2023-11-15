<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const columns: SkTableColumn[] = [
    {
        title: 'Número',
        key: 'number'
    },
    {
        title: 'Numero de serie',
        key: 'serial',
        formatter: (value: ISim | null) => value?.serial ?? '-'
    },
    {
        title: 'Proveedor',
        key: 'provider',
        formatter: (value: ISimProvider | null) => value?.name ?? '-'
    }
]

const { page, search, data, refresh } = await useTableData<ISim>('/api/sims')
const { navigateToAction } = useActions(refresh)

function openCreate() {
    navigateToAction({
        name: 'create-sim'
    })
}
</script>

<template>
<main>
    <SkTable
        :table="data" 
        :columns="columns"
        v-model="search"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="openCreate">
                <IconsAdd />
            </button>
        </template>
    </SkTable>
</main>
</template>