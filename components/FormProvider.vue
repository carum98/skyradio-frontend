<script setup lang="ts">
import { FormDataProvider } from '#imports'

const props = defineProps<{
    provider?: ISimProvider
}>()

const emits = defineEmits<{
    submitted: [value: FormDataProvider]
}>()

// data
const form = ref(props.provider ? FormDataProvider.update(props.provider) : FormDataProvider.create())
const buttonText = props.provider ? 'Actualizar' : 'Crear'

// methods
function send() {
    emits('submitted', form.value)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Nombre del Proveedor"
            autofocus
            v-model="form.name" 
        />
        <button type="submit" class="sk-button">
            {{ buttonText }}
        </button>
    </form>
</template>