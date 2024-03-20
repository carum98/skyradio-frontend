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
    props: { client: props.client },
    rootProps: {
        width: 300
    }
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

function onConsole() {
    navigateToAction({
        name: 'create-console',
        props: { client: props.client }
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
        key: 'enable-console',
        name: 'Habilitar consola',
        icon: '<svg width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M1.5 2h13l.5.5v5.503a5.006 5.006 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10z"/><path d="M9.778 8.674a4 4 0 1 1 4.444 6.652a4 4 0 0 1-4.444-6.652m2.13 4.99l2.387-3.182l-.8-.6l-2.077 2.769l-1.301-1.041l-.625.78l1.704 1.364l.713-.09z"/></g></svg>',
        color: '58, 160, 58',
        action: onConsole,
        show: true,
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
    (props.showLogs ?? false) ? actions.length - 5 : 0,
    actions.length - 4,
    actions.length - 3,
    actions.length - 2
]
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    ></SkDropdown>
</template>