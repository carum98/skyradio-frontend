<script setup lang="ts">
import { FormDataModality } from '#imports'

const props = defineProps<{
    modality: IModality
    onUpdate: (data: IModality) => void
}>()

// methods
async function onSubmitted(formData: FormDataModality) {
    const data = await $fetch<IModality>(`/api/clients-modality/${props.modality.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormModality
        :modality="modality"
        @submitted="onSubmitted"
    />
</template>