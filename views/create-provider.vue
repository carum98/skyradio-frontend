<script setup lang="ts">
import { FormDataProvider } from '#imports'

const emits = defineEmits<{
    close: []
    created: [ISimProvider]
}>()

// methods
async function onSubmitted(formData: FormDataProvider) {
    const data = await $fetch<ISimProvider>('/api/sims-provider', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('created', data)
    emits('close')
}
</script>

<template>
    <FormProvider
        @submitted="onSubmitted"
    />
</template>