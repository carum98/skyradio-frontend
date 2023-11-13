<script setup lang="ts">
import { FormDataStatus } from '#imports'

const props = defineProps<{
    status: IRadioStatus
    onUpdate: (data: IRadioStatus) => void
}>()

// methods
async function onSubmitted(formData: FormDataStatus) {
    const data = await $fetch<IRadioStatus>(`/api/radios-status/${props.status.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormStatus
        :status="status"
        @submitted="onSubmitted"
    />
</template>