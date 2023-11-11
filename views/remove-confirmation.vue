<script setup lang="ts">
const props = defineProps<{
    name: string
    path: string
    onUpdate: () => void
    onDiscard: () => void
}>()

function onConfirm() {
    fetch(props.path, {
        method: 'DELETE'
    })
    .then(() => {
        props.onUpdate()
    })
}
</script>

<template>
    <p>
        Eliminar <strong>{{ name }}</strong>?
    </p>
    <div>
        <button class="sk-button" @click="onConfirm">
            Confirmar
        </button>
        <button class="sk-button" @click="onDiscard">
            Cancelar
        </button>
    </div>
</template>