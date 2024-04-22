<script setup lang="ts">
const props = defineProps<{
    sim: ISim
    refresh: () => void
}>()

const dialog = useDialogs()
const { isAdmin, isUser } = useRole()

const { navigateToAction } = useActions(props.refresh)

let actions = computed(() => [
    {
        ...ActionsStatic.ADD,
        key: 'add-sim',
        name: 'Relacionar Radio',
        action: () => navigateToAction({
            name: 'add-radio',
            props: { sim: props.sim }
        }),
        show: (isAdmin || isUser) && props.sim.radio === null
    },
    {
        ...ActionsStatic.CHANGE,
        key: 'swap-sim',
        name: 'Cambiar SIM',
        action: () => navigateToAction({
            name: 'swap-sim',
            props: { radio: props.sim.radio, simOld: props.sim }
        }),
        show: (isAdmin || isUser) && props.sim.radio !== null
    },
    {
        ...ActionsStatic.REMOVE,
        key: 'remove-sim',
        name: 'Desvincular SIM',
        action: () => navigateToAction({
            name: 'remove-sim2',
            props: { sim: props.sim }
        }),
        show: (isAdmin || isUser) && props.sim.radio !== null
    },
    {
        ...ActionsStatic.UPDATE,
        key: 'edit-radio',
        action: () => dialog.push({
            name: 'sims-form',
            props: {
                sim: props.sim
            },
            listeners: {
                onRefresh: props.refresh
            }
        }),
        show: isAdmin || isUser
    },
    {
        ...ActionsStatic.DELETE,
        key: 'delete-radio',
        action: () => dialog.confirmRemove({
            name: 'sims',
            code: props.sim.code,
            callback: props.refresh
        }),
        show: isAdmin || isUser
    }
])

let dividers = computed(() => [
    actions.value.length - 2
])
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    ></SkDropdown>
</template>