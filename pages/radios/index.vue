<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const columns: SkTableColumn[] = [
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'IMEI',
        key: 'imei',
    },
    {
        title: 'Serial',
        key: 'serial',
    },
    {
        title: 'Modelo',
        key: 'model',
        formatter: (value: IRadioModel | null) => value?.name ?? '-'
    },
    {
        title: 'Sim / Proveedor',
        key: 'sim',
    },
    {
        title: 'Cliente',
        key: 'client',
        formatter: (value: IClient | null) => value?.name ?? '-'
    },
    {
        title: 'Estado',
        key: 'status',
        formatter: (value: IRadioStatus | null) => value?.name ?? '-'
    },
    {
        title: '',
        key: 'actions',
        width: 65,
        align: 'center',
    }
]
// data
const { page, data, search, refresh } = await useTableData<IRadio>('/api/radios')
const { OpenRemove, OpenSwap, OpenAddClient } = useActions(refresh)

// methods
const { open: OpenCreate, close } = useModal({
    component: import('@views/create-radio.vue'),
    props: {
        onCreated(_client: IRadio) {
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

function rowActions(item: IRadio) {
    if (item.client === null) {
        return [
            {
                key: 'add',
                label: ActionsStatic.ADD.name,
                icon: ActionsStatic.ADD.icon,
                color: ActionsStatic.ADD.color,
                action: () => OpenAddClient({ radio: item })
            },
        ]
    } else {
        return [
            {
                key: 'swap',
                label: ActionsStatic.CHANGE.name,
                icon: ActionsStatic.CHANGE.icon,
                color: ActionsStatic.CHANGE.color,
                action: () => OpenSwap({ radio: item, client: item.client })
            },
            {
                key: 'remove',
                label: ActionsStatic.REMOVE.name,
                icon: ActionsStatic.REMOVE.icon,
                color: ActionsStatic.REMOVE.color,
                action: () => OpenRemove({ radio: item, client: item.client })
            }
        ]
    }
}
</script>

<template>
<main>
    <SkTable 
        :table="data"
        :columns="columns"
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

        <template #cell(sim)="{ value }">
            <p>{{ value?.number }}</p>
            <p>{{ value?.provider?.name }}</p>
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown :options="rowActions(item)" />
        </template>
    </SkTable>
</main>
</template>