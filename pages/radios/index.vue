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
const { navigateToAction } = useActions(refresh)

// methods
function openProfile(radio: IRadio) {
    navigateTo({
        name: 'radios-profile',
        params: {
            code: radio.code
        }
    })
}

function openUpdate(radio: IRadio) {
    navigateToAction({
        name: 'update-radio',
        props: {
            radio
        }
    })
}

function openDelete(radio: IRadio) {
    navigateToAction({
        name: 'remove-radio',
        props: {
            code: radio.code
        }
    })
}

function openAddClient(radio: IRadio) {
    navigateToAction({
        name: 'add-client',
        props: {
            radio
        }
    })
}

function openSwap(radio: IRadio) {
    navigateToAction({
        name: 'swap-radio',
        props: {
            radio: radio, 
            client: radio.client
        }
    })
}

function openRemove(radio: IRadio) {
    navigateToAction({
        name: 'remove-radio',
        props: {
            radio: radio, 
            client: radio.client
        }
    })
}

function openCreateRadio() {
    navigateToAction({
        name: 'create-radio'
    })
}

function rowActions(item: IRadio) {
    let actions = [
        {
            key: 'edit',
            label: ActionsStatic.UPDATE.name,
            icon: ActionsStatic.UPDATE.icon,
            color: ActionsStatic.UPDATE.color,
            action: () => openUpdate(item)
        },
        {
            key: 'delete',
            label: ActionsStatic.DELETE.name,
            icon: ActionsStatic.DELETE.icon,
            color: ActionsStatic.DELETE.color,
            action: () => openDelete(item)
        }
    ]

    if (item.client === null) {
        actions.unshift(
            {
                key: 'add',
                label: ActionsStatic.ADD.name,
                icon: ActionsStatic.ADD.icon,
                color: ActionsStatic.ADD.color,
                action: () => openAddClient(item)
            }
        )
    } else {
        actions.unshift(...[
            {
                key: 'swap',
                label: ActionsStatic.CHANGE.name,
                icon: ActionsStatic.CHANGE.icon,
                color: ActionsStatic.CHANGE.color,
                action: () => openSwap(item)
            },
            {
                key: 'remove',
                label: ActionsStatic.REMOVE.name,
                icon: ActionsStatic.REMOVE.icon,
                color: ActionsStatic.REMOVE.color,
                action: () => openRemove(item)
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
            <button class="add-button" @click="openCreateRadio">
                <IconsAdd />
            </button>
        </template>

        <template #cell(sim)="{ value }">
            <p>{{ value?.number }}</p>
            <p>{{ value?.provider?.name }}</p>
        </template>

        <template #cell(client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                @click.native.stop
            >
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown 
                :dividerPosition="item.client === null ? 1 : 2"
                :options="rowActions(item)" 
            />
        </template>
    </SkTable>
</main>
</template>