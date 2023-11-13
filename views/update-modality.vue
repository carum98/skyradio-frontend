<script setup lang="ts">
import { FormDataModality } from '#imports'

const props = defineProps<{
    modality: IModality
}>()

const emits = defineEmits<{
    close: []
    update: [IModality]
}>()

// methods
async function onSubmitted(formData: FormDataModality) {
    const data = await $fetch<IModality>(`/api/clients-modality/${props.modality.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('update', data)
    emits('close')
}
</script>

<template>
    <FormModality
        :modality="modality"
        @submitted="onSubmitted"
    />
</template>