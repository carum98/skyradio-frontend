<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const props = defineProps<{
    path: string
    enableTableActions?: boolean
}>()

const columns = ref<SkTableColumn[]>([
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
        altTitle: 'Cantidad de radios',
        key: 'radios_count',
        width: 100,
        align: 'center',
    },
    {
        title: '',
        altTitle: 'Historial de cambios',
        key: 'logs',
        width: 65,
        align: 'center',
    },
    {
        title: '',
        altTitle: 'Acciones',
        key: 'actions',
        width: 65,
        align: 'center',
    }
])

const { page, search, data, refresh, query } = await useTableData<IClient>(props.path)
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

        <template v-if="enableTableActions" #actions>
            <TableActionsClient
                :columns="columns"
                @onApplied="query = $event"
            />
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
                :key="item.code"
                :client="item" 
                :refresh="refresh"
                show-actions
            />
        </template>
    </SkTable>
</template>