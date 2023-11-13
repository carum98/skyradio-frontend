<script setup lang="ts">
import { FormDataModality } from '#imports'

const emits = defineEmits<{
    close: []
    created: [IModality]
}>()

// methods
async function onSubmitted(formData: FormDataModality) {
    const data = await $fetch<IModality>('/api/clients-modality', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('created', data)
    emits('close')
}
</script>

<template>
    <FormModality
        @submitted="onSubmitted"
    />
</template>