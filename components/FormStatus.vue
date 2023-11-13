<script setup lang="ts">
import { FormDataStatus } from '#imports'

const props = defineProps<{
    status?: IRadioStatus
}>()

const emits = defineEmits<{
    submitted: [value: FormDataStatus]
}>()

// data
const form = ref(props.status ? FormDataStatus.update(props.status) : FormDataStatus.create())
const buttonText = props.status ? 'Actualizar' : 'Crear'

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