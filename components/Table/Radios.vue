<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const toast = useToast()

const props = withDefaults(defineProps<{
    path: string
    enableTableActions?: boolean
    enableClientActions?: boolean
    enableCreate?: boolean
    hideModel?: boolean
    hideSim?: boolean
    hideProvider?: boolean
    hideClient?: boolean
}>(), {
    enableTableActions: false,
    enableClientActions: false,
    enableCreate: false,
    hideModel: false,
    hideSim: false,
    hideProvider: false,
    hideClient: false,
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
    },
    {
        title: 'Número de serie',
        key: 'serial',
        show: false
    },
    {
        title: 'Modelo',
        key: 'model',
        show: !props.hideModel
    },
    {
        title: 'Sim',
        key: 'sim',
        show: !props.hideSim
    },
    {
        title: 'Proveedor',
        key: 'sim.provider',
        show: !props.hideProvider
    },
    {
        title: 'Cliente',
        key: 'client',
        show: !props.hideClient
    },
    {
        title: 'Estado',
        key: 'status',
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
        key: 'actions',
        width: 65,
        align: 'center',
    }
])

// data
const { page, data, search, refresh, query } = await useTableData<IRadio>(props.path)
const { navigateToAction } = useActions(refreshList)
const { open: openLogs } = useLogs('radios')

const routerModal = useRouterModal()

// methods
function refreshList() {
    refresh()
    emits('refresh')
}

function openProfile(radio: IRadio) {
    routerModal.push({
        name: 'profile-radio',
        props: {
            code: radio.code
        }
    })
}

function openCreateRadio() {
    navigateToAction({
        name: 'create-radio'
    })
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

function copy(value: string) {
    navigator.clipboard.writeText(value)
    
    toast.open({
        title: 'Copiado',
        message: 'El IMEI ha sido copiado al portapapeles',
        type: 'success'
    })
}
</script>

<template>
    <SkTable 
        :table="data"
        :columns="columns"
        v-model="search"
        hover
        @onRowClick="openProfile"
        @onPage="page = $event"
    >
        <template v-if="enableCreate" #toolbar>
            <button class="add-button" @click="openCreateRadio">
                <IconsAdd />
            </button>
        </template>

        <template v-if="enableTableActions" #actions>
            <TableActionsRadios
                :columns="columns"
                @onApplied="query = $event"
            />
        </template>

        <template v-if="enableClientActions" #toolbar>
            <slot 
                name="actions" 
                :openSwap="openSwap"
                :openRemove="openRemove"
                :openAdd="openAdd"
            />

        </template>

        <template #cell(imei)="{ value }">
            <span class="imei-text">
                {{ value }}
                <button @click.stop="copy(value)">
                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H9V4h9zM3 15v-2h2v2zm0-5.5h2v2H3zM10 20h2v2h-2zm-7-1.5v-2h2v2zM5 22c-1.1 0-2-.9-2-2h2zm3.5 0h-2v-2h2zm5 0v-2h2c0 1.1-.9 2-2 2M5 6v2H3c0-1.1.9-2 2-2"/></svg>
                </button>
            </span>
        </template>

        <template #cell(model)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-model"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </SkLinkModal>
        </template>

        <template #cell(sim)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-sim"
                :props="{ code: value.code }"
                class="sk-link"
            >
                {{ value.number  }}
            </SkLinkModal>
        </template>

        <template #cell(sim.provider)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-provider"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </SkLinkModal>
        </template>

        <template #cell(client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                @click.native.stop
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(status)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-status"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </SkLinkModal>
        </template>

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" @click.stop="openLogs(item.code)">
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