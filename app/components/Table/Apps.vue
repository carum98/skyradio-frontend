<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const dialog = useDialogs()
const { isAdmin, isUser } = useRole()

const props = withDefaults(defineProps<{
    path: string
    hideClient?: boolean
    enableTableActions?: boolean
    client?: IClient | null
}>(), {
    enableTableActions: false,
    hideClient: false,
})

const columns = ref<SkTableColumn[]>([
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'Licencia',
        key: 'license',
        width: 200,
    },
    {
        title: 'Cliente',
        key: 'client',
        show: !props.hideClient,
        width: 300,
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

const { page, search, data, refresh, query } = await useTableData<IApp>(props.path)
const { navigateToAction } = useActions(refresh)
const { open: openLogs } = useLogs('apps')

function openCreate() {
    if (props.client) {
        navigateToAction({
            name: 'create-apps',
            props: { client: props.client },
        })
    } else {
        dialog.push({
            name: 'apps-form',
            listeners: {
                onRefresh: refresh
            }
        })
    }
}

function onUpdate(app: IApp) {
    dialog.push({
        name: 'apps-form',
        props: { app, client: props.client },
        listeners: {
            onRefresh: refresh
        }
    })
}

function onDelete(app: IApp) {
    dialog.confirmRemove({
        name: 'apps',
        code: app.code,
        callback: refresh
    })
}

const showCreate = isAdmin || isUser
const showTableActions = (isAdmin || isUser) && props.enableTableActions
</script>

<template>
    <SkTable
        :table="data" 
        :columns="columns"
        v-model:search="search"
        v-model:page="page"
    >
        <template v-if="showCreate" #toolbar>
            <button class="add-button" aria-label="create client" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template v-if="showTableActions" #actions>
            <TableActionsApps
                :columns="columns"
                @onApplied="query = $event"
            ></TableActionsApps>
        </template>

        <template #cell(license)="{ value }">
            <CopyValue :value="value?.key">
                {{ value?.key }}
            </CopyValue>
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

        <template #cell(logs)="{ item }">
            <button class="sk-dropdown__button" aria-label="logs" @click.stop="openLogs(item.code)">
                <IconsLogs />
            </button>
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown 
                :options="[
                    {
                        key: 'edit',
                        ...ActionsStatic.UPDATE,
                        action: () => onUpdate(item),
                    },
                    {
                        key: 'delete',
                        ...ActionsStatic.DELETE,
                        action: () => onDelete(item),
                    }
                ]" 
            ></SkDropdown>
        </template>
    </SkTable>
</template>