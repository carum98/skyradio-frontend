<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

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
    },
    {
        title: '',
        key: 'actions',
        width: 65,
        align: 'center',
    }
]

const { page, search, data, refresh } = await useTableData<IClient>('/api/clients')
const { navigateToAction } = useActions(refresh)

// methods
function openSwap(client: IClient) {
    navigateToAction({
        name: 'swap',
        props: {
            client
        }
    })
}

function openProfile(client: IClient) {
    navigateTo({
        name: 'companies-profile',
        params: {
            code: client.code
        }
    })
}

function openAdd(client: IClient) {
    navigateToAction({
        name: 'add',
        props: {
            client
        }
    })
}

function openRemove(client: IClient) {
    navigateToAction({
        name: 'remove',
        props: {
            client
        }
    })
}

function openCreateClient() {
    navigateToAction({
        name: 'create-client',
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
            <button class="add-button" @click="openCreateClient">
                <IconsAdd />
            </button>
        </template>

        <template #cell(radios_count)="{ item }">
            <span class="counter">{{ item.radios_count }}</span>
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown :options="[
                {
                    key: 'change',
                    label: ActionsStatic.CHANGE.name,
                    icon: ActionsStatic.CHANGE.icon,
                    color: ActionsStatic.CHANGE.color,
                    action: () => openSwap(item)
                },
                {
                    key: 'add',
                    label: ActionsStatic.ADD.name,
                    icon: ActionsStatic.ADD.icon,
                    color: ActionsStatic.ADD.color,
                    action: () => openAdd(item)
                },
                {
                    key: 'remove',
                    label: ActionsStatic.REMOVE.name,
                    icon: ActionsStatic.REMOVE.icon,
                    color: ActionsStatic.REMOVE.color,
                    action: () => openRemove(item)
                }
            ]" />
        </template>
    </SkTable>
</main>
</template>