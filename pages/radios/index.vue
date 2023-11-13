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
const { openRemoveInstance } = useRemoveInstance('Radio', refresh)

// methods
const { open: OpenCreate, close: CloseCreate } = useModal({
    component: import('@views/create-radio.vue'),
    props: {
        onCreated(_client: IRadio) {
            refresh()
            CloseCreate()
        }
    }
})

const { open: OpenUpdate, close: CloseUpdate } = useModal({
    component: import('@views/update-radio.vue'),
    props: {
        onUpdate(_client: IRadio) {
            refresh()
            CloseUpdate()
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
    let actions = [
        {
            key: 'delete',
            label: ActionsStatic.DELETE.name,
            icon: ActionsStatic.DELETE.icon,
            color: ActionsStatic.DELETE.color,
            action: () => openRemoveInstance({ 
                path: `/api/radios/${item.code}`,
            })
        },
        {
            key: 'edit',
            label: ActionsStatic.UPDATE.name,
            icon: ActionsStatic.UPDATE.icon,
            color: ActionsStatic.UPDATE.color,
            action: () => OpenUpdate({ radio: item })
        }
    ]

    if (item.client === null) {
        actions.push(
            {
                key: 'add',
                label: ActionsStatic.ADD.name,
                icon: ActionsStatic.ADD.icon,
                color: ActionsStatic.ADD.color,
                action: () => OpenAddClient({ radio: item })
            }
        )
    } else {
        actions.push(...[
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
        ])
    }

    return actions
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