<script setup lang="ts">
const props = defineProps<{
    sim: ISim
    refresh: () => void
}>()

const { navigateToAction } = useActions(props.refresh)

let actions = [
    {
        ...ActionsStatic.ADD,
        key: 'add-sim',
        name: 'Relacionar Radio',
        action: () => navigateToAction({
            name: 'add-radio',
            props: { sim: props.sim }
        }),
        show: props.sim.radio === null
    },
    {
        ...ActionsStatic.CHANGE,
        key: 'swap-sim',
        name: 'Cambiar SIM',
        action: () => navigateToAction({
            name: 'swap-sim',
            props: { radio: props.sim.radio, simOld: props.sim }
        }),
        show: props.sim.radio !== null
    },
    {
        ...ActionsStatic.REMOVE,
        key: 'remove-sim',
        name: 'Desvincular SIM',
        action: () => navigateToAction({
            name: 'remove-sim2',
            props: { sim: props.sim }
        }),
        show: props.sim.radio !== null
    },
    {
        ...ActionsStatic.UPDATE,
        key: 'edit-radio',
        action: () => navigateToAction({
            name: 'update-sim',
            props: { sim: props.sim }
        }),
        show: true
    },
    {
        ...ActionsStatic.DELETE,
        key: 'delete-radio',
        action: () => navigateToAction({
            name: 'remove-sim',
            props: { code: props.sim.code } 
        }),
        show: true
    }
].filter(action => action.show)

let dividers = [
    actions.length - 2
]
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    />
</template>