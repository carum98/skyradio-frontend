<script setup lang="ts">
import { FormDataSim } from '#imports'

const props = defineProps<{
    sim?: ISim
}>()

const emits = defineEmits<{
    submitted: [value: FormDataSim]
}>()

// data
const form = ref(props.sim ? FormDataSim.update(props.sim) : FormDataSim.create())
const buttonText = props.sim ? 'Actualizar' : 'Crear'

// methods
function send() {
    emits('submitted', form.value)
}
</script>

<template>
    <form class="sk-form" @submit.prevent="send" style="width: 350px;">
        <label>Nombre</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Número de la sim"
            autofocus
            v-model="form.number" 
        />
        <label>Serial</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Número de serie"
            v-model="form.serial"
        />
        <label>Proveedor</label>
        <SelectSimProvider 
            v-model="form.provider"
        />
        <button type="submit" class="sk-button">
            {{ buttonText }}
        </button>
    </form>
</template>