<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const props = withDefaults(defineProps<{
    path: string
    enableTableActions?: boolean
    enableCreate?: boolean
    hideProvider?: boolean
}>(), {
    enableTableActions: false,
    enableCreate: false,
    hideProvider: false
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
        show: !props.hideProvider
    },
    {
        title: 'Radio',
        key: 'radio',
    },
    {
        title: 'Cliente',
        key: 'radio.client',
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

const { page, search, data, refresh, query } = await useTableData<ISim>(props.path)
const { navigateToAction } = useActions(refresh)
const { open: openLogs } = useLogs('sims')

const routerModal = useRouterModal()

// methods
function openProfile(sim: ISim) {
    routerModal.push({
        name: 'profile-sim',
        props: {
            code: sim.code
        }
    })
}

function openCreate() {
    navigateToAction({
        name: 'create-sim'
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
            <button class="add-button" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template v-if="enableTableActions" #actions>
            <TableActionsSims 
                :columns="columns"
                @onApplied="query = $event"
            />
        </template>

        <template #cell(number)="{ value }">
            <CopyValue :value="value">
                {{ value }}
            </CopyValue>
        </template>

        <template #cell(provider)="{ value }">
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

        <template #cell(radio)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-radio"
                :props="{ code: value.code }"
                class="sk-link"
            >
                {{ value.imei  }}
            </SkLinkModal>
        </template>

        <template #cell(radio.client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                class="sk-link"
                @click.stop
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" @click.stop="openLogs(item.code)">
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