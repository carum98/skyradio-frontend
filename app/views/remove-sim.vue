<script setup lang="ts">
const props = defineProps<{
    radio?: IRadio
    sim?: ISim
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

async function onConfirm() {
    const path = props.sim 
        ? `/api/sims/${props.sim?.code}/radios`
        : `/api/radios/${props.radio?.code}/sims`

    await $fetch(path, {
        method: 'DELETE'
    })

    emits('refresh')
    emits('close')
}
</script>

<template>
    <svg width="48" height="48" viewBox="0 0 12 12">
        <path fill="currentColor" d="M5.5 6.5a.5.5 0 0 0 1 0V2.707l1.146 1.147a.5.5 0 1 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L5.5 2.707V6.5ZM6 11a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"/>
    </svg>

    <p>
        ¿Desvincular SIM?
    </p>

    <div class="d-flex-center">
        <button class="sk-button sk-button--transparent" @click="$emit('close')">
            Cancelar
        </button>
        <button class="sk-button" @click="onConfirm">
            Aceptar
        </button>
    </div>
</template>

<style scoped>
svg {
    margin: auto;
    display: block;
    color: red;
}

p {
    text-align: center;
    font-size: 1.5rem;
    margin: 1rem 0;
    color: var(--text-color);
}
</style>