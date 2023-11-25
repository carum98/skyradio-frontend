<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const columns: SkTableColumn[] = [
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'IMEI',
        key: 'imei',
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
// data
const { page, data, search, refresh } = await useTableData<IRadio>('/api/radios')
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

        <template #cell(model)="{ value }">
            <a v-if="value" href="">
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value?.name }}
            </a>
        </template>

        <template #cell(sim)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-sim"
                :props="{ code: value.code }"
            >
                {{ value.number  }}
            </SkLinkModal>
        </template>

        <template #cell(sim.provider)="{ value }">
            <a v-if="value" href="">
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </a>
        </template>

        <template #cell(client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                @click.native.stop
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(status)="{ value }">
            <a v-if="value" href="">
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value?.name }}
            </a>
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