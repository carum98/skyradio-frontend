<script setup lang="ts">
import { FormDataSeller } from '#imports'

const props = defineProps<{
    seller?: ISeller
}>()

const emits = defineEmits<{
    submitted: [value: FormDataSeller]
}>()

// data
const form = ref(props.seller ? FormDataSeller.update(props.seller) : FormDataSeller.create())
const buttonText = props.seller ? 'Actualizar' : 'Crear'

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
            placeholder="Nombre del Vendedor"
            autofocus
            v-model="form.name" 
        />
        <button type="submit" class="sk-button">
            {{ buttonText }}
        </button>
    </form>
</template>