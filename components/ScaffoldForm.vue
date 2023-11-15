<script setup lang="ts" generic="T extends SkFormData">
import { SkFormData } from '@utils/form-data'

const props = defineProps<{
    form: T
    pathCreate: string
    pathUpdate: string
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

// data
const buttonText = props.form.isEditing ? 'Actualizar' : 'Guardar'

// methods
async function onSubmitted() {
    const path = props.form.isEditing
        ? props.pathUpdate.replace(/\/:\w+/, `/${props.form.code}`)
        : props.pathCreate
    
    const method = props.form.isEditing
        ? 'PUT' 
        : 'POST'

    await $fetch(path, {
        method,
        body: props.form.toParams(),
    })

    emits('refresh')
    emits('close')
}
</script>

<template>
    <form class="sk-form" @submit.prevent="onSubmitted">
        <slot name="form" :form="form" />

        <button type="submit" class="sk-button">
            {{ buttonText }}
        </button>
    </form>
</template>