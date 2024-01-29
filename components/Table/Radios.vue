<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

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
            <CopyValue :value="value">
                {{ value }}
            </CopyValue>
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