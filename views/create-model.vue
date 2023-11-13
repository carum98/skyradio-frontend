<script setup lang="ts">
import { FormDataModel } from '#imports'

const props = defineProps<{
    onCreated: (data: IRadioModel) => void
}>()

// methods
async function onSubmitted(formData: FormDataModel) {
    const data = await $fetch<IRadioModel>('/api/radios-model', {
        method: 'POST',
        body: formData.toParams(),
    })

    props.onCreated(data)
}
</script>

<template>
    <FormModel 
        @submitted="onSubmitted"
    />
</template>