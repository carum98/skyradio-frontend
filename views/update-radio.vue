<script setup lang="ts">
import { FormDataRadio } from '@utils/form-data-radio'

const props = defineProps<{
    radio: IRadio 
    onUpdate: (data: IRadio) => void
}>()

// methods
async function onSubmitted(formData: FormDataRadio) {
    const data = await $fetch<IRadio>(`/api/radios/${props.radio.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormRadio 
        :radio="radio"
        @submitted="onSubmitted"
    />
</template>