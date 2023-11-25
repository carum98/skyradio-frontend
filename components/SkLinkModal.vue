<script setup lang="ts">
import type { RouterModalNames } from '@composables/useRouterModal'

const props = defineProps<{
    name: RouterModalNames,
    props: Record<string, unknown>
}>()

const routerModal = useRouterModal()

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
    routerModal.push(props)
}
</script>

<template>
    <a :href="href" @click.stop.prevent="onClick">
        <slot></slot>
    </a>
</template>