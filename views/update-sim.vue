<script setup lang="ts">
import { FormDataSim } from '#imports'

const props = defineProps<{
    sim: ISim
}>()

const emits = defineEmits<{
    close: []
    update: [ISim]
}>()

// methods
async function onSubmitted(formData: FormDataSim) {
    const data = await $fetch<ISim>(`/api/radios/${props.sim.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('update', data)
    emits('close')
}
</script>

<template>
    <FormSim
        :sim="sim"
        @submitted="onSubmitted"
    />
</template>