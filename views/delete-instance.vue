<script setup lang="ts">
const props = defineProps<{
    name: string
    code: string
    path: string
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

function onConfirm() {
    fetch(props.path.replace(/\/:\w+/, `/${props.code}`), {
        method: 'DELETE'
    })
    .then(() => {
        emits('refresh')
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