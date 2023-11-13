<script setup lang="ts">
import { FormDataSim } from '#imports'

const emits = defineEmits<{
    close: []
    created: [ISim]
}>()

// methods
async function onSubmitted(formData: FormDataSim) {
    const data = await $fetch<ISim>('/api/sims', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('created', data)
    emits('close')
}
</script>

<template>
    <FormSim 
        @submitted="onSubmitted"
    />
</template>