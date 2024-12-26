<script setup lang="ts">

const props = defineProps<{
    name: PushOptions['name']
    props: PushOptions['props']
}>()

const dialog = useDialogs()

// data
const object = {
    name: props.name,
    ...props.props
}

const query = Object.entries(object).map(([key, value]) => {
    return `${key}=${value}`
}).join('&')

const href = `?${query}`

// methods
function onClick() {
    dialog.push(props)
}
</script>

<template>
    <a :href="href" @click.stop.prevent="onClick">
        <slot></slot>
    </a>
</template>