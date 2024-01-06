<script setup lang="ts" generic="T extends SkFormData">
import { SkFormData } from '@utils/form-data'
const toast = useToast()

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

// computed
const disabled = computed<boolean>(() => !props.form.isValid || props.form.isDirty)

// methods
async function onSubmitted() {
    try {
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

        toast.open({
            title: 'Exito!!',
            message: props.form.isEditing ? 'Editado correctamente' : 'Creado correctamente',
            type: 'success',
        })

        emits('refresh')
        emits('close')
    } catch (error) {
        console.error(error)
        toast.open({
            title: 'Error!!',
            message: props.form.isEditing ? 'Error al editar' : 'Error al crear',
            type: 'error',
        })
    }
}
</script>

<template>
    <form class="sk-form" @submit.prevent="onSubmitted">
        <slot name="form" :form="form" />

        <button type="submit" class="sk-button" :disabled="disabled">
            {{ buttonText }}
        </button>
    </form>
</template>