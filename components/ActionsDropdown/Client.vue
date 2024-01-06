<script setup lang="ts">
const props = defineProps<{
    client: IClient
    showLogs?: boolean
    showActions?: boolean
    refresh: () => void
}>()

const { navigateToAction } = useActions(props.refresh)

const { open: openClientLogs } = useLogs('clients')

const { open: openExport } = useModal({
    component: () => import('@views/export-client.vue'),
    props: { client: props.client }
})

function onChange() {
    navigateToAction({
        name: 'swap-radio',
        props: { client: props.client }
    })
}

function onAdd() {
    navigateToAction({
        name: 'add-radios',
        props: { client: props.client }
    })
}

function onRemove() {
    navigateToAction({
        name: 'remove-radio',
        props: { client: props.client }
    })
}

function onUpdate() {
    navigateToAction({
        name: 'update-client',
        props: { client: props.client }
    })
}

function onDelete() {
    navigateToAction({
        name: 'remove-client',
        props: { code: props.client.code }
    })
}

const actions = [
    {
        key: 'change',
        ...ActionsStatic.CHANGE,
        action: onChange,
        show: props.client.radios_count > 0 && props.showActions
    },
    {
        key: 'add',
        ...ActionsStatic.ADD,
        action: onAdd,
        show: true && props.showActions
    },
    {
        key: 'remove',
        ...ActionsStatic.REMOVE,
        action: onRemove,
        show: props.client.radios_count > 0 && props.showActions
    },
    {
        key: 'history',
        ...ActionsStatic.HISTORY,
        action: () => openClientLogs(props.client?.code ?? ''),
        show: props.showLogs ?? false
    },
    {
        key: 'export',
        ...ActionsStatic.EXPORT,
        action: openExport,
        show: true
    },
    {
        key: 'edit',
        ...ActionsStatic.UPDATE,
        action: onUpdate,
        show: true
    },
    {
        key: 'delete',
        ...ActionsStatic.DELETE,
        action: onDelete,
        show: true
    }
].filter(action => action.show)

const dividers = [
    (props.showLogs ?? false) ? actions.length - 4 : 0,
    actions.length - 3,
    actions.length - 2
]
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    />
</template>