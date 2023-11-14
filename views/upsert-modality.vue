<script setup lang="ts">
import { FormDataModality } from '#imports'

const props = defineProps<{
    modality?: IModality
}>()

const emits = defineEmits<{
    close: []
    refresh: []
}>()

// methods
async function onSubmitted(formData: FormDataModality) {
    const path = props.modality
        ? `/api/clients-modality/${props.modality.code}`
        : '/api/clients-modality'
    
    const method = props.modality 
        ? 'PUT' 
        : 'POST'

    await $fetch<IModality>(path, {
        method,
        body: formData.toParams(),
    })

    emits('refresh')
    emits('close')
}
</script>

<template>
    <FormModality
        :modality="modality"
        @submitted="onSubmitted"
    />
</template>