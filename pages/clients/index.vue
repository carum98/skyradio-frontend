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
function openProfile(client: IClient) {
    navigateTo({
        name: 'clients-profile',
        params: {
            code: client.code
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
            <ActionsDropdownClient 
                :client="item" 
                :refresh="refresh"
            />
        </template>
    </SkTable>
</main>
</template>