<script setup lang="ts">
import type { RouterModalNames } from '@composables/useRouterModal'

const props = defineProps<{
    name: RouterModalNames,
    props: Record<string, unknown>
}>()

const object = {
    name: props.name,
    ...props.props
}

const query = Object.entries(object).map(([key, value]) => {
    return `${key}=${value}`
}).join('&')

const href = `?${query}`
</script>

<template>
    <a :href="href" @click.stop.prevent="$routerModal.push(props)">
        <slot></slot>
    </a>
</template>