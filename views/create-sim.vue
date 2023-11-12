<script setup lang="ts">
import { FormDataSim } from '#imports'

const props = defineProps<{
    onCreated: (data: ISim) => void
}>()

// methods
async function onSubmitted(formData: FormDataSim) {
    const data = await $fetch<ISim>('/api/sims', {
        method: 'POST',
        body: formData.toParams(),
    })

    props.onCreated(data)
}
</script>

<template>
    <FormSim 
        @submitted="onSubmitted"
    />
</template>