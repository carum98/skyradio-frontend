<script setup lang="ts">
import { FormDataRadio } from '@utils/form-data-radio'

const props = defineProps<{
    onCreated: (data: IRadio) => void
}>()

// methods
async function onSubmitted(formData: FormDataRadio) {
    const data = await $fetch<IRadio>('/api/radios', {
        method: 'POST',
        body: formData.toParams(),
    })

    props.onCreated(data)
}
</script>

<template>
    <FormRadio 
        @submitted="onSubmitted"
    />
</template>