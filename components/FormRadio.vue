<script setup lang="ts">
import { FormDataRadio } from '@utils/form-data-radio'

const props = defineProps<{
    radio?: IRadio
}>()

const emits = defineEmits<{
    submitted: [value: FormDataRadio]
}>()

// data
const form = ref(props.radio ? FormDataRadio.update(props.radio) : FormDataRadio.create())
const buttonText = props.radio ? 'Actualizar' : 'Crear'

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
            placeholder="Nombre del radio"
            autofocus
            v-model="form.name" 
        />
        <label>IMEI</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="IMEI"
            v-model="form.imei"
        />
        <label>Serial</label>
        <input 
            type="text" 
            class="sk-input"
            placeholder="Número de serie"
            v-model="form.serial"
        />
        <label>Modelo</label>
        <SelectRadioModel
            v-model="form.model"
        />
        <button type="submit" class="sk-button">
            {{ buttonText }}
        </button>
    </form>
</template>