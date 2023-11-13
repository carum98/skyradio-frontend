<script setup lang="ts">
import { FormDataModality } from '#imports'

const props = defineProps<{
    modality?: IClient
}>()

const emits = defineEmits<{
    submitted: [value: FormDataModality]
}>()

// data
const form = ref(props.modality ? FormDataModality.update(props.modality) : FormDataModality.create())
const buttonText = props.modality ? 'Actualizar' : 'Crear'

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
            placeholder="Nombre de la Modalidad"
            autofocus
            v-model="form.name" 
        />
        <button type="submit" class="sk-button">
            {{ buttonText }}
        </button>
    </form>
</template>