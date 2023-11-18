<script setup lang="ts">
const props = defineProps<{
    radio: IRadio
    refresh: () => void
}>()

const { navigateToAction } = useActions(props.refresh)

// data
let actionsClient = [
    {
        ...ActionsStatic.ADD,
        key: 'add-client',
        action: () => navigateToAction({
            name: 'remove-radio',
            props: {
                radio: props.radio, 
                client: props.radio.client
            }
        }),
        show: props.radio.client === null,
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
        show: props.radio.client !== null,
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
        show: props.radio.client !== null
    },
].filter(action => action.show)

let actionsSim = [
    {
        ...ActionsStatic.ADD,
        key: 'add-sim',
        name: 'Relacionar SIM',
        action: () => navigateToAction({
            name: 'add-sim',
            props: { radio: props.radio }
        }),
        show: props.radio.sim === null
    },
    {
        ...ActionsStatic.CHANGE,
        key: 'swap-sim',
        name: 'Cambiar SIM',
        action: () => navigateToAction({
            name: 'swap-sim',
            props: { radio: props.radio }
        }),
        show: props.radio.sim !== null
    },
    {
        ...ActionsStatic.REMOVE,
        key: 'remove-sim',
        name: 'Desvincular SIM',
        action: () => navigateToAction({
            name: 'remove-sim2',
            props: { radio: props.radio }
        }),
        show: props.radio.sim !== null
    },
].filter(action => action.show)

let actions = [
    ...actionsClient,
    ...actionsSim,
    {
        ...ActionsStatic.UPDATE,
        key: 'edit-radio',
        action: () => navigateToAction({
            name: 'update-radio',
            props: { radio: props.radio }
        })
    },
    {
        ...ActionsStatic.DELETE,
        key: 'delete-radio',
        action: () => navigateToAction({
            name: 'remove-radio',
            props: { code: props.radio.code } 
        })
    }
]

const dividers = [
    actionsClient.length,
    actionsClient.length + actionsSim.length,
]
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    />
</template>