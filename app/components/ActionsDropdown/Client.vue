<script setup lang="ts">
const props = defineProps<{
    client: IClient
    showLogs?: boolean
    showActions?: boolean
    refresh: () => void
}>()

const dialog = useDialogs()
const { isAdmin, isUser } = useRole()

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
    dialog.push({
        name: 'clients-form',
        props: { client: props.client },
        listeners: {
            onRefresh: props.refresh
        }
    })
}

function onDelete() {
    dialog.confirmRemove({
        name: 'clients',
        code: props.client.code,
        callback: props.refresh
    })
}

function onEnableConsole() {
    dialog.push({
        name: 'consoles-form',
        props: { client: props.client },
        listeners: {
            onRefresh: props.refresh
        }
    })
}

function onDisableConsole() {
    dialog.confirmRemove({
        name: 'consoles',
        code: props.client.console?.code ?? '',
        callback: props.refresh
    })
}

const actions = computed(() => [
    {
        key: 'change',
        ...ActionsStatic.CHANGE,
        action: onChange,
        show: (isAdmin || isUser) && props.client.radios_count > 0 && props.showActions
    },
    {
        key: 'add',
        ...ActionsStatic.ADD,
        action: onAdd,
        show: (isAdmin || isUser) && props.showActions
    },
    {
        key: 'remove',
        ...ActionsStatic.REMOVE,
        action: onRemove,
        show: (isAdmin || isUser) && props.client.radios_count > 0 && props.showActions
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
        action: onEnableConsole,
        show: (isAdmin || isUser) && props.client.console === null,
    },
    {
        key: 'disable-console',
        name: 'Desabilitar con...',
        icon: '<svg width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M1.5 2h13l.5.5v5.503a5.006 5.006 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10z"/><path d="M9.778 8.674a4 4 0 1 1 4.444 6.652a4 4 0 0 1-4.444-6.652m2.13 4.99l2.387-3.182l-.8-.6l-2.077 2.769l-1.301-1.041l-.625.78l1.704 1.364l.713-.09z"/></g></svg>',
        color: '160, 58, 58',
        action: onDisableConsole,
        show: (isAdmin || isUser) && props.client.console !== null,
    },
    {
        key: 'edit',
        ...ActionsStatic.UPDATE,
        action: onUpdate,
        show: (isAdmin || isUser)
    },
    {
        key: 'delete',
        ...ActionsStatic.DELETE,
        action: onDelete,
        show: (isAdmin || isUser)
    }
].filter(action => action.show))

const dividers = computed(() => [
    (props.showLogs ?? false) ? actions.value.length - 5 : 0,
    actions.value.length - 4,
    actions.value.length - 3,
    actions.value.length - 2
])
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    ></SkDropdown>
</template>