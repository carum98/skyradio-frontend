<script setup lang="ts">
const props = defineProps<{
    client: IClient
    refresh: () => void
}>()

const { navigateToAction } = useActions(props.refresh)

let actions = [
    {
        key: 'change',
        ...ActionsStatic.CHANGE,
        action: () => navigateToAction({
            name: 'swap-radio',
            props: { client: props.client }
        }),
        show: props.client.radios_count > 0
    },
    {
        key: 'add',
        ...ActionsStatic.ADD,
        action: () =>     navigateToAction({
            name: 'add-radios',
            props: { client: props.client }
        }),
        show: true
    },
    {
        key: 'remove',
        ...ActionsStatic.REMOVE,
        action: () => navigateToAction({
            name: 'remove-radio',
            props: { client: props.client }
        }),
        show: props.client.radios_count > 0
    },
    {
        key: 'edit',
        ...ActionsStatic.UPDATE,
        action: () => navigateToAction({
            name: 'update-client',
            props: { client: props.client }
        }),
        show: true
    },
    {
        key: 'delete',
        ...ActionsStatic.DELETE,
        action: () => navigateToAction({
            name: 'remove-client',
            props: { code: props.client.code }
        }),
        show: true
    }
].filter(action => action.show)

const dividers = [
    actions.length - 2
]
</script>

<template>
    <SkDropdown 
        :dividers="dividers"
        :options="actions" 
    />
</template>