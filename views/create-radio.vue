<script setup lang="ts">
import { FormDataRadio } from '#imports'

const emits = defineEmits<{
    close: []
    refresh: [IRadio]
}>()

// methods
async function onSubmitted(formData: FormDataRadio) {
    const data = await $fetch<IRadio>('/api/radios', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('refresh', data)
    emits('close')
}
</script>

<template>
    <FormRadio 
        @submitted="onSubmitted"
    />
</template>