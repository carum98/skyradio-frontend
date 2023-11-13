<script setup lang="ts">
import { FormDataStatus } from '#imports'

const props = defineProps<{
    status: IRadioStatus
    onCreated: (data: IRadioStatus) => void
}>()

// methods
async function onSubmitted(formData: FormDataStatus) {
    const data = await $fetch<IRadioStatus>('/api/radios-status', {
        method: 'POST',
        body: formData.toParams(),
    })

    props.onCreated(data)
}
</script>

<template>
    <FormStatus
        :status="status"
        @submitted="onSubmitted"
    />
</template>