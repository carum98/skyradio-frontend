<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const dialog = useDialogs()
const { isAdmin, isUser } = useRole()

const props = withDefaults(defineProps<{
    path: string
    enableTableActions?: boolean
    enableCreate?: boolean
    hideProvider?: boolean
    hideStatsButton?: boolean
}>(), {
    enableTableActions: false,
    enableCreate: false,
    hideProvider: false,
    hideStatsButton: false
})

const columns = ref<SkTableColumn[]>([
    {
        title: 'Número',
        key: 'number'
    },
    {
        title: 'Numero de serie',
        key: 'serial',
        formatter: (value: string | null) => value ?? '',
        show: false
    },
    {
        title: 'Proveedor',
        key: 'provider',
        show: !props.hideProvider,
        width: 170,
        align: 'center',
    },
    {
        title: 'Radio',
        key: 'radio',
        align: 'center',
    },
    {
        title: 'Cliente',
        key: 'radio.client',
        width: 250,
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
        show: isAdmin || isUser,
        key: 'actions',
        width: 65,
        align: 'center',
    }
])

// data
const { page, search, data, refresh, query } = await useTableData<ISim>(props.path)
const { open: openLogs } = useLogs('sims')

const showCreate = (isAdmin || isUser) && props.enableCreate
const showTableActions = (isAdmin || isUser) && props.enableTableActions

// methods
function openProfile(sim: ISim) {
    dialog.push({
        name: 'sims-profile',
        props: {
            code: sim.code
        }
    })
}

function openCreate() {
    dialog.push({
        name: 'sims-form',
        listeners: {
            onRefresh: refresh
        }
    })
}

function openImportSims() {
    useModal({
        component: () => import('@views/import-items.vue'),
        rootProps: {
            width: 300
        },
        props: {
            instance: 'sims'
        },
        listeners: {
            onRefresh: refresh
        }
    }).open({})
}
</script>

<template>
    <SkTable
        :table="data" 
        :columns="columns"
        v-model:search="search"
        v-model:page="page"
        hover
        @onRowClick="openProfile"
    >
        <template v-if="showCreate" #toolbar>
            <button class="add-button" aria-label="create sim" @click="openCreate">
                <IconsAdd />
            </button>

            <button aria-label="import sims" @click="openImportSims">
                <IconsImport />
            </button>
        </template>

        <template v-if="showTableActions" #actions>
            <TableActionsSims 
                :columns="columns"
                :hide-stats-button="hideStatsButton"
                @onApplied="query = $event"
            ></TableActionsSims>
        </template>

        <template #cell(number)="{ value }">
            <CopyValue :value="value">
                {{ value }}
            </CopyValue>
        </template>

        <template #cell(provider)="{ value }">
            <SkLinkDialog
                v-if="value"
                name="providers-profile"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </SkLinkDialog>
        </template>

        <template #cell(radio)="{ value }">
            <SkLinkDialog
                v-if="value"
                name="radios-profile"
                :props="{ code: value.code }"
                class="sk-link"
            >
                {{ value.imei  }}
            </SkLinkDialog>
        </template>

        <template #cell(radio.client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                class="sk-link text-ellipsis"
                @click.stop
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" aria-label="logs" @click.stop="openLogs(item.code)">
                <IconsLogs />
            </button>
        </template>

        <template #cell(actions)="{ item }">
            <ActionsDropdownSim 
                :key="item.code"
                :sim="item"
                :refresh="refresh"
            />
        </template>
    </SkTable>
</template>