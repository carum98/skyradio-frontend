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
        formatter: (value: string | null) => value ?? '-'
    },
    {
        title: 'Proveedor',
        key: 'provider',
        formatter: (value: ISimProvider | null) => value?.name ?? '-'
    },
    {
        title: 'Radio',
        key: 'radio',
    },
    {
        title: 'Cliente',
        key: 'radio.client',
    },
    {
        title: '',
        key: 'actions',
        width: 65,
        align: 'center',
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

        <template #cell(radio)="{ value }">
            <NuxtLink
                v-if="value"
                :to="{ name: 'radios-profile', params: { code: value.code } }"
            >
                <p>{{ value.imei }}</p>
            </NuxtLink> 
        </template>

        <template #cell(radio.client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
            >
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(actions)="{ item }">
            <ActionsDropdownSim 
                :sim="item"
                :refresh="refresh"
            />
        </template>
    </SkTable>
</main>
</template>