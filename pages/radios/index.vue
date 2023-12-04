<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

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
    },
    {
        title: 'Sim',
        key: 'sim',
    },
    {
        title: 'Proveedor',
        key: 'sim.provider',
    },
    {
        title: 'Cliente',
        key: 'client',
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
const { page, data, search, refresh, query } = await useTableData<IRadio>('/api/radios')
const { navigateToAction } = useActions(refresh)
const { open: openLogs } = useLogs('radios')

const routerModal = useRouterModal()

// methods
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

</script>

<template>
<main>
    <SkTable 
        :table="data"
        :columns="columns"
        v-model="search"
        hover
        @onRowClick="openProfile"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="openCreateRadio">
                <IconsAdd />
            </button>
        </template>

        <template #actions>
            <TableActionsRadios
                :columns="columns"
                @onApplied="query = $event"
            />
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
                :radio="item"
                :refresh="refresh"
            />
        </template>
    </SkTable>
</main>
</template>