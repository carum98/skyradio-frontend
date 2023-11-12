<script setup lang="ts">
import { FormDataSim } from '#imports'

const props = defineProps<{
    sim: ISim
    onUpdate: (data: ISim) => void
}>()

// methods
async function onSubmitted(formData: FormDataSim) {
    const data = await $fetch<ISim>(`/api/radios/${props.sim.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormSim
        :sim="sim"
        @submitted="onSubmitted"
    />
</template>