<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const dialog = useDialogs()

const props = withDefaults(defineProps<{
    path: string
    enableTableActions?: boolean
    enableCreate?: boolean
    hideSeller?: boolean
    hideModality?: boolean
    hideStatsButton?: boolean
}>(), {
    enableTableActions: false,
    enableCreate: false,
    hideSeller: false,
    hideModality: false,
    hideStatsButton: false
})

const columns = ref<SkTableColumn[]>([
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'Vendedor',
        key: 'seller',
        width: 200,
        align: 'center',
        show: !props.hideSeller
    },
    {
        title: 'Modalidad',
        key: 'modality',
        width: 200,
        align: 'center',
        show: !props.hideModality
    },
    {
        title: 'Radios',
        altTitle: 'Cantidad de radios',
        key: 'radios_count',
        width: 100,
        align: 'center',
    },
    {
        title: 'Apps',
        altTitle: 'Cantidad de aplicaciones',
        key: 'apps_count',
        width: 100,
        align: 'center',
    },
    {
        title: 'Consola',
        key: 'console',
        width: 100,
        align: 'center'
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
    dialog.push({
        name: 'clients-form',
        listeners: {
            onRefresh: refresh
        }
    })
}
</script>

<template>
    <SkTable
        :columns="columns"
        :table="data" 
        v-model:search="search"
        v-model:page="page"
        hover
        @onRowClick="openProfile"
    >
        <template v-if="enableCreate" #toolbar>
            <button class="add-button" aria-label="create client" @click="openCreateClient">
                <IconsAdd />
            </button>
        </template>

        <template v-if="enableTableActions" #actions>
            <TableActionsClient
                :columns="columns"
                :hide-stats-button="hideStatsButton"
                @onApplied="query = $event"
            />
        </template>

        <template #cell(name)="{ value, item }">
            <div class="grid-auto-1fr">
                <SkAvatar :key="item.code" :alt="value" :color="item.color" />
                <p class="text-ellipsis">{{ value }}</p>
            </div>
        </template>

        <template #cell(radios_count)="{ value }">
            <span class="counter" :disabled="value === 0">
                {{ value }}
            </span>
        </template>

        <template #cell(apps_count)="{ value }">
            <span class="counter" :disabled="value === 0">
                {{ value }}
            </span>
        </template>

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" aria-label="logs" @click.stop="openLogs(item.code)">
                <IconsLogs />
            </button>
        </template>

        <template #cell(seller)="{ value }">
            <SkLinkDialog
                v-if="value"
                name="sellers-profile"
                :props="{ code: value.code }"
                class="sk-link"
            >
                {{ value.name }}
            </SkLinkDialog> 
        </template>

        <template #cell(modality)="{ value }">
            <SkLinkDialog
                v-if="value"
                name="modalities-profile"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name  }}
            </SkLinkDialog>
        </template>

        <template #cell(console)="{ value }">
            <svg v-if="value == null" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="M3.175 3.175L5 5H4v11h9.2L1.4 4.2q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l18.4 18.4q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L15.2 18H14v2h1q.425 0 .713.288T16 21q0 .425-.288.713T15 22H9q-.425 0-.712-.288T8 21q0-.425.288-.712T9 20h1v-2H4q-.825 0-1.412-.587T2 16V5q0-.925.588-1.375zM22 5v10.5q0 .5-.312.75T21 16.5q-.375 0-.687-.262T20 15.475V5H9q-.5 0-.75-.312T8 4q0-.375.25-.687T9 3h11q.825 0 1.413.588T22 5M8.6 11.4"/></svg>
            <svg v-else width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M1.5 2h13l.5.5v5.503a5.006 5.006 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10z"/><path d="M9.778 8.674a4 4 0 1 1 4.444 6.652a4 4 0 0 1-4.444-6.652m2.13 4.99l2.387-3.182l-.8-.6l-2.077 2.769l-1.301-1.041l-.625.78l1.704 1.364l.713-.09z"/></g></svg>
        </template>

        <template #cell(actions)="{ item }">
            <ActionsDropdownClient 
                :key="item.code"
                :client="item" 
                :refresh="refresh"
                show-actions
            ></ActionsDropdownClient>
        </template>
    </SkTable>
</template>