<script setup lang="ts">
import { FormDataModality } from '#imports'

const props = defineProps<{
    onCreated: (data: IModality) => void
}>()

// methods
async function onSubmitted(formData: FormDataModality) {
    const data = await $fetch<IModality>('/api/clients-modality', {
        method: 'POST',
        body: formData.toParams(),
    })

    props.onCreated(data)
}
</script>

<template>
    <FormModality
        @submitted="onSubmitted"
    />
</template>