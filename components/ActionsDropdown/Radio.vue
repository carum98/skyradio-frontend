<script setup lang="ts">
const props = defineProps<{
    radio: IRadio
    refresh: () => void
}>()

const dialog = useDialogs()
const { isAdmin, isUser } = useRole()

const { navigateToAction } = useActions(props.refresh)

// data
let actionsClient = computed(() => [
    {
        ...ActionsStatic.ADD,
        key: 'add-client',
        action: () => navigateToAction({
            name: 'add-client',
            props: {
                radio: props.radio, 
                client: props.radio.client
            }
        }),
        show: (isAdmin || isUser) && props.radio.client === null,
    },
    {
        ...ActionsStatic.CHANGE,
        key: 'swap-radio',
        action: () => navigateToAction({
            name: 'swap-radio',
            props: {
                radio: props.radio, 
                client: props.radio.client
            }
        }),
        show: (isAdmin || isUser) && props.radio.client !== null,
    },
    {
        ...ActionsStatic.REMOVE,
        key: 'remove-radio',
        action: () => navigateToAction({
            name: 'remove-radio',
            props: {
                radio: props.radio, 
                client: props.radio.client
            }
        }),
        show: (isAdmin || isUser) && props.radio.client !== null
    },
])

let actionsSim = computed(() => [
    {
        ...ActionsStatic.ADD,
        key: 'add-sim',
        name: 'Relacionar SIM',
        action: () => navigateToAction({
            name: 'add-sim',
            props: { radio: props.radio }
        }),
        show: (isAdmin || isUser) && props.radio.sim === null
    },
    {
        ...ActionsStatic.CHANGE,
        key: 'swap-sim',
        name: 'Cambiar SIM',
        action: () => navigateToAction({
            name: 'swap-sim',
            props: { radio: props.radio, simOld: props.radio.sim }
        }),
        show: (isAdmin || isUser) && props.radio.sim !== null
    },
    {
        ...ActionsStatic.REMOVE,
        key: 'remove-sim',
        name: 'Desvincular SIM',
        action: () => navigateToAction({
            name: 'remove-sim2',
            props: { radio: props.radio }
        }),
        show: (isAdmin || isUser) && props.radio.sim !== null
    },
])

let actions = computed(() => [
    ...actionsClient.value,
    ...actionsSim.value,
    {
        ...ActionsStatic.CHANGE,
        icon: '<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M9 9h6v6H9"/></svg>',
        key: 'swap-status',
        name: 'Cambiar Estado',
        action: () => navigateToAction({
            name: 'edit-status',
            props: { radio: props.radio }
        }),
        show: isAdmin || isUser
    },
    {
        ...ActionsStatic.UPDATE,
        key: 'edit-radio',
        action: () => dialog.push({
            name: 'radios-form',
            props: { radio: props.radio },
            listeners: { onRefresh: props.refresh }
        }),
        show: isAdmin || isUser
    },
    {
        ...ActionsStatic.DELETE,
        key: 'delete-radio',
        action: () => dialog.confirmRemove({
            name: 'radios',
            code: props.radio.code,
            callback: props.refresh
        }),
        show: isAdmin || isUser
    }
].filter(action => action.show))

const dividers = computed(() => [
    actionsClient.value.length,
    actionsClient.value.length + actionsSim.value.length,
    actions.value.length - 2
])
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    ></SkDropdown>
</template>