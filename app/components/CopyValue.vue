<script setup lang="ts">
const toast = useToast()

const { value } = defineProps<{
    value: string
}>()

function copy() {
    navigator.clipboard.writeText(value)
    
    toast.open({
        title: 'Copiado',
        message: 'Copiado al portapapeles',
        type: 'success'
    })
}
</script>

<template>
    <span class="copy-value">
        <slot></slot>

        <button @click.stop="copy">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H9V4h9zM3 15v-2h2v2zm0-5.5h2v2H3zM10 20h2v2h-2zm-7-1.5v-2h2v2zM5 22c-1.1 0-2-.9-2-2h2zm3.5 0h-2v-2h2zm5 0v-2h2c0 1.1-.9 2-2 2M5 6v2H3c0-1.1.9-2 2-2"/></svg>
        </button>
    </span>
</template>

<style>
.copy-value {
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;

    & button {
        visibility: hidden;
        color: rgba(var(--text-color-rgb), 0.5);

        &:hover {
            color: rgba(var(--text-color-rgb), 1);
        }
    }

    &:hover button {
        visibility: visible;
    }
}
</style>