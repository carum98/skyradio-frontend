<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const dialog = useDialogs()
const { isAdmin, isUser } = useRole()

const props = withDefaults(defineProps<{
    path: string
    enableTableActions?: boolean
    enableClientActions?: boolean
    enableCreate?: boolean
    hideModel?: boolean
    hideSim?: boolean
    hideProvider?: boolean
    hideClient?: boolean
    hideStatsButton?: boolean
}>(), {
    enableTableActions: false,
    enableClientActions: false,
    enableCreate: false,
    hideModel: false,
    hideSim: false,
    hideProvider: false,
    hideClient: false,
    hideStatsButton: false
})

const emits = defineEmits<{
    refresh: []
}>()

const columns = ref<SkTableColumn[]>([
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'IMEI',
        key: 'imei',
        width: 200,
    },
    {
        title: 'Número de serie',
        key: 'serial',
        show: false
    },
    {
        title: 'Modelo',
        key: 'model',
        show: !props.hideModel,
        width: 130,
        align: 'center',
    },
    {
        title: 'Sim',
        key: 'sim',
        show: !props.hideSim,
        width: 150,
        align: 'center',
    },
    {
        title: 'Proveedor',
        key: 'sim.provider',
        show: !props.hideProvider,
        width: 170,
        align: 'center',
    },
    {
        title: 'Cliente',
        key: 'client',
        show: !props.hideClient,
        width: 200,
        align: 'center',
    },
    {
        title: 'Estado',
        key: 'status',
        width: 65,
        align: 'center',
        show: false
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
const { page, data, search, refresh, query } = await useTableData<IRadio>(props.path)
const { navigateToAction } = useActions(refreshList)
const { open: openLogs } = useLogs('radios')

const showCreate = (isAdmin || isUser) && props.enableCreate
const showTableActions = (isAdmin || isUser) && props.enableTableActions

// methods
function refreshList() {
    refresh()
    emits('refresh')
}

function openProfile(radio: IRadio) {
    dialog.push({
        name: 'radios-profile',
        props: {
            code: radio.code
        }
    })
}

function openCreateRadio() {
    dialog.push({
        name: 'radios-form',
        listeners: {
            onRefresh: refreshList
        }
    })
}

function openImportRadio() {
    useModal({
        component: () => import('@views/import-items.vue'),
        rootProps: {
            width: 300
        },
        props: {
            instance: 'radios'
        },
        listeners: {
            onRefresh: refreshList
        }
    }).open({})
}

function openSwap({ client, radio }: { client: IClient | null, radio: IRadio | null }) {
    navigateToAction({
        name: 'swap-radio',
        props: {
            client,
            radio
        }
    })
}

function openRemove({ client, radio }: { client: IClient | null, radio: IRadio | null }) {
    navigateToAction({
        name: 'remove-radio',
        props: {
            client,
            radio
        }
    })
}

function openAdd(client: IClient | null) {
    navigateToAction({
        name: 'add-radios',
        props: {
            client
        }
    })
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
            <button class="add-button" aria-label="create radio" @click="openCreateRadio">
                <IconsAdd />
            </button>
            
            <button aria-label="import radio" @click="openImportRadio">
                <IconsImport />
            </button>
        </template>

        <template v-if="showTableActions" #actions>
            <TableActionsRadios
                :columns="columns"
                :hide-stats-button="hideStatsButton"
                @onApplied="query = $event"
            ></TableActionsRadios>
        </template>

        <template v-if="enableClientActions" #toolbar>
            <slot 
                name="actions" 
                :openSwap="openSwap"
                :openRemove="openRemove"
                :openAdd="openAdd"
                :hasData="(data?.pagination.total ?? 0) > 0"
            ></slot>

        </template>

        <template #cell(name)="{ value }">
            <p class="text-ellipsis">
                {{ value }}
            </p>
        </template>

        <template #cell(imei)="{ value }">
            <CopyValue :value="value">
                {{ value }}
            </CopyValue>
        </template>

        <template #cell(model)="{ value }">
            <SkLinkDialog
                v-if="value"
                name="models-profile"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </SkLinkDialog>
        </template>

        <template #cell(sim)="{ value }">
            <SkLinkDialog
                v-if="value"
                name="sims-profile"
                :props="{ code: value.code }"
                class="sk-link"
            >
                {{ value.number  }}
            </SkLinkDialog>
        </template>

        <template #cell(sim.provider)="{ value }">
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

        <template #cell(client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                @click.native.stop
                class="sk-link text-ellipsis"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(status)="{ value }">
            <SkLinkDialog
                v-if="value"
                name="status-profile"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </SkLinkDialog>
        </template>

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" aria-label="logs" @click.stop="openLogs(item.code)">
                <IconsLogs />
            </button>
        </template>

        <template #cell(actions)="{ item }">
            <ActionsDropdownRadio
                :key="item.code"
                :radio="item"
                :refresh="refreshList"
            />
        </template>
    </SkTable>
</template>