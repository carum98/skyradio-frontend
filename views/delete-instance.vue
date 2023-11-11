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
        console.log('Registro eliminado')
        props.onUpdate()
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
        <button class="sk-button" @click="onDiscard">
            Cancelar
        </button>
        <button class="sk-button" @click="onConfirm">
            Confirmar
        </button>
    </div>
</template>