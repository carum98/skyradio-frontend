<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const props = withDefaults(defineProps<{
    path: string
    enableTableActions?: boolean
    enableCreate?: boolean
    hideSeller?: boolean
    hideModality?: boolean
}>(), {
    enableTableActions: false,
    enableCreate: false,
    hideSeller: false,
    hideModality: false
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
        title: '',
        altTitle: 'Cantidad de radios',
        key: 'radios_count',
        width: 100,
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
        key: 'actions',
        width: 65,
        align: 'center',
    }
])

const { page, search, data, refresh, query } = await useTableData<IClient>(props.path)
const { navigateToAction } = useActions(refresh)
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
    navigateToAction({
        name: 'create-client',
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
            <button class="add-button" @click="openCreateClient">
                <IconsAdd />
            </button>
        </template>

        <template v-if="enableTableActions" #actions>
            <TableActionsClient
                :columns="columns"
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

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" @click.stop="openLogs(item.code)">
                <IconsLogs />
            </button>
        </template>

        <template #cell(seller)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-seller"
                :props="{ code: value.code }"
                class="sk-link"
            >
                {{ value.name }}
            </SkLinkModal> 
        </template>

        <template #cell(modality)="{ value }">
            <SkLinkModal
                v-if="value"
                name="profile-modality"
                :props="{ code: value.code }"
                class="sk-link"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name  }}
            </SkLinkModal>
        </template>

        <template #cell(actions)="{ item }">
            <ActionsDropdownClient 
                :key="item.code"
                :client="item" 
                :refresh="refresh"
                show-actions
            />
        </template>
    </SkTable>
</template>