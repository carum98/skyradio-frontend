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
        title: 'Serial',
        key: 'serial',
    },
    {
        title: 'Modelo',
        key: 'model',
        formatter: (value: IRadioModel | null) => value?.name ?? '-'
    },
    {
        title: 'Sim / Proveedor',
        key: 'sim',
    },
    {
        title: 'Cliente',
        key: 'client',
    },
    {
        title: 'Estado',
        key: 'status',
        formatter: (value: IRadioStatus | null) => value?.name ?? '-'
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

// methods
function openProfile(radio: IRadio) {
    navigateTo({
        name: 'radios-profile',
        params: {
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

        <template #cell(sim)="{ value }">
            <p>{{ value?.number }}</p>
            <p>{{ value?.provider?.name }}</p>
        </template>

        <template #cell(client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                @click.native.stop
            >
                {{ value.name }}
            </NuxtLink>
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