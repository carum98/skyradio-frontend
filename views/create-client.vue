<script setup lang="ts">
import { FormDataClient } from '#imports'

const emits = defineEmits<{
    close: []
    refresh: [IClient]
}>()

// methods
async function onSubmitted(formData: FormDataClient) {
    const data = await $fetch<IClient>('/api/clients', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('refresh', data)
    emits('close')
}
</script>

<template>
    <FormClient 
        @submitted="onSubmitted"
    />
</template>