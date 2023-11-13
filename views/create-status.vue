<script setup lang="ts">
import { FormDataStatus } from '#imports'

const emits = defineEmits<{
    close: []
    created: [IRadioStatus]
}>()

// methods
async function onSubmitted(formData: FormDataStatus) {
    const data = await $fetch<IRadioStatus>('/api/radios-status', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('created', data)
    emits('close')
}
</script>

<template>
    <FormStatus
        @submitted="onSubmitted"
    />
</template>