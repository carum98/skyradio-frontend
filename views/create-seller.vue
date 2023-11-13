<script setup lang="ts">
import { FormDataSeller } from '#imports'

const emits = defineEmits<{
    close: []
    created: [ISeller]
}>()

// methods
async function onSubmitted(formData: FormDataSeller) {
    const data = await $fetch<ISeller>('/api/sellers', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('created', data)
    emits('close')
}
</script>

<template>
    <FormSeller 
        @submitted="onSubmitted"
    />
</template>