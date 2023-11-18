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
    <p>
        ¿Desvincular SIM?
    </p>
    <div>
        <button class="sk-button" @click="$emit('close')">
            Cancelar
        </button>
        <button class="sk-button" @click="onConfirm">
            Confirmar
        </button>
    </div>
</template>