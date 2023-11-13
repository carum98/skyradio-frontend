<script setup lang="ts">
import { FormDataModel } from '#imports'

const props = defineProps<{
    model?: IRadioModel
}>()

const emits = defineEmits<{
    submitted: [value: FormDataModel]
}>()

// data
const form = ref(props.model ? FormDataModel.update(props.model) : FormDataModel.create())
const buttonText = props.model ? 'Actualizar' : 'Crear'

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