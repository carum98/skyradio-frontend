<script setup lang="ts">
const props = defineProps<{
    client?: IClient
}>()

console.log(props)

const emits = defineEmits<{
    submitted: [value: FormDataClient]
}>()

// data
const form = ref(props.client ? FormDataClient.update(props.client) : FormDataClient.create())
const buttonText = props.client ? 'Actualizar' : 'Crear'

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
            placeholder="Nombre de la Compañía"
            autofocus
            v-model="form.name" 
        />
        <label>Modalidad</label>
        <SelectModality 
            v-model="form.modality" 
        />
        <label>Vendedor</label>
        <SelectSeller 
            v-model="form.seller" 
        />
        <button type="submit" class="sk-button">
            {{ buttonText }}
        </button>
    </form>
</template>