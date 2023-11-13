<script setup lang="ts">
import { FormDataModel } from '#imports'

const emits = defineEmits<{
    close: []
    created: [IRadioModel]
}>()

// methods
async function onSubmitted(formData: FormDataModel) {
    const data = await $fetch<IRadioModel>('/api/radios-model', {
        method: 'POST',
        body: formData.toParams(),
    })

    emits('created', data)
    emits('close')
}
</script>

<template>
    <FormModel 
        @submitted="onSubmitted"
    />
</template>