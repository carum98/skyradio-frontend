<script setup lang="ts">
import { FormDataRadio } from '#imports'

const props = defineProps<{
    radio: IRadio 
}>()

const emits = defineEmits<{
    close: []
    update: [IRadio]
}>()

// methods
async function onSubmitted(formData: FormDataRadio) {
    const data = await $fetch<IRadio>(`/api/radios/${props.radio.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('update', data)
    emits('close')
}
</script>

<template>
    <FormRadio 
        :radio="radio"
        @submitted="onSubmitted"
    />
</template>