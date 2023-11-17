<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const columns: SkTableColumn[] = [
    {
        title: 'Número',
        key: 'number'
    },
    {
        title: 'Numero de serie',
        key: 'serial',
        formatter: (value: string | null) => value ?? '-'
    },
    {
        title: 'Proveedor',
        key: 'provider',
        formatter: (value: ISimProvider | null) => value?.name ?? '-'
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
        key: 'actions',
        width: 65,
        align: 'center',
    }
]

const { page, search, data, refresh } = await useTableData<ISim>('/api/sims')
const { navigateToAction } = useActions(refresh)

function openCreate() {
    navigateToAction({
        name: 'create-sim'
    })
}

function openUpdate(sim: ISim) {
    navigateToAction({
        name: 'update-sim',
        props: {
            sim
        }
    })
}

function openDelete(sim: ISim) {
    navigateToAction({
        name: 'remove-sim',
        props: {
            code: sim.code
        }
    })
}
</script>

<template>
<main>
    <SkTable
        :table="data" 
        :columns="columns"
        v-model="search"
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell(radio)="{ value }">
            <NuxtLink
                v-if="value"
                :to="{ name: 'radios-profile', params: { code: value.code } }"
            >
                <p>{{ value.name }}</p>
                <p>{{ value.imei }}</p>
            </NuxtLink> 
        </template>

        <template #cell(radio.client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'companies-profile', params: { code: value.code } }"
            >
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown 
                :dividerPosition="3"
                :options="[
                    {
                        key: 'swap',
                        label: ActionsStatic.CHANGE.name,
                        icon: ActionsStatic.CHANGE.icon,
                        color: ActionsStatic.CHANGE.color,
                        action: () => {}
                    },
                    {
                        key: 'add',
                        label: 'Relacionar',
                        icon: ActionsStatic.ADD.icon,
                        color: ActionsStatic.ADD.color,
                        action: () => {}
                    },
                    {
                        key: 'remove',
                        label:'Desvincular',
                        icon: ActionsStatic.REMOVE.icon,
                        color: ActionsStatic.REMOVE.color,
                        action: () => {}
                    },
                    {
                        key: 'edit',
                        label: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => openUpdate(item)
                    },
                    {
                        key: 'delete',
                        label: ActionsStatic.DELETE.name,
                        icon: ActionsStatic.DELETE.icon,
                        color: ActionsStatic.DELETE.color,
                        action: () => openDelete(item)
                    }
                ]" 
            />
        </template>
    </SkTable>
</main>
</template>