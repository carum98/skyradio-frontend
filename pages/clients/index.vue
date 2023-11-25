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
    },
    {
        title: 'Modalidad',
        key: 'modality',
        width: 300,
        align: 'center',
    },
    {
        title: '',
        key: 'radios_count',
        width: 100,
        align: 'center',
    },
    {
        title: '',
        key: 'logs',
        width: 65,
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
const { open: openLogs } = useLogs('clients')

// methods
function openSwap(client: IClient) {
    navigateToAction({
        name: 'swap-radio',
        props: {
            client
        }
    })
}

function openProfile(client: IClient) {
    navigateTo({
        name: 'clients-profile',
        params: {
            code: client.code
        }
    })
}

function openAdd(client: IClient) {
    navigateToAction({
        name: 'add-radios',
        props: {
            client
        }
    })
}

function openRemove(client: IClient) {
    navigateToAction({
        name: 'remove-radio',
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

function openUpdate(client: IClient) {
    navigateToAction({
        name: 'update-client',
        props: {
            client
        }
    })
}

function openDelete(client: IClient) {
    navigateToAction({
        name: 'remove-client',
        props: {
            code: client.code
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
            <button class="add-button" @click="openCreateClient">
                <IconsAdd />
            </button>
        </template>

        <template #cell(name)="{ value, item }">
            <SkAvatar class="mr-1" :alt="value" :color="item.color" />
            {{ value }}
        </template>

        <template #cell(radios_count)="{ value }">
            <span class="counter" :disabled="value === 0">
                {{ value }}
            </span>
        </template>

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" @click.stop="openLogs(item.code)">
                <IconsLogs />
            </button>
        </template>

        <template #cell(seller)="{ value }">
            <NuxtLink
                v-if="value"
                :to="{ name: 'sellers-profile', params: { code: value.code } }"
                @click.stop
                class="sk-link"
            >
                {{ value.name }}
            </NuxtLink> 
        </template>

        <template #cell(modality)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-modality"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name  }}
            </SkLinkModal>
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown 
                :dividers="[3]"
                :options="[
                    {
                        key: 'change',
                        name: ActionsStatic.CHANGE.name,
                        icon: ActionsStatic.CHANGE.icon,
                        color: ActionsStatic.CHANGE.color,
                        action: () => openSwap(item)
                    },
                    {
                        key: 'add',
                        name: ActionsStatic.ADD.name,
                        icon: ActionsStatic.ADD.icon,
                        color: ActionsStatic.ADD.color,
                        action: () => openAdd(item)
                    },
                    {
                        key: 'remove',
                        name: ActionsStatic.REMOVE.name,
                        icon: ActionsStatic.REMOVE.icon,
                        color: ActionsStatic.REMOVE.color,
                        action: () => openRemove(item)
                    },
                    {
                        key: 'edit',
                        name: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => openUpdate(item)
                    },
                    {
                        key: 'delete',
                        name: ActionsStatic.DELETE.name,
                        icon: ActionsStatic.DELETE.icon,
                        color: ActionsStatic.DELETE.color,
                        action: () => openDelete(item)
                    }
                ]" 
            />
        </template>
    </SkTable>
</main>
</template>