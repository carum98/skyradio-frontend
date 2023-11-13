<script setup lang="ts">
const props = defineProps<{
    name: string
    path: string
}>()

const emits = defineEmits<{
    close: []
    update: []
}>()

function onConfirm() {
    fetch(props.path, {
        method: 'DELETE'
    })
    .then(() => {
        emits('update')
        emits('close')
    })
    .catch(() => {
        alert('Ocurrió un error al eliminar el registro')
    })
}
</script>

<template>
    <p>
        ¿Desea eliminar el <strong>{{ name }}</strong>?
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