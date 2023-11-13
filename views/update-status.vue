<script setup lang="ts">
import { FormDataStatus } from '#imports'

const props = defineProps<{
    status: IRadioStatus
}>()

const emits = defineEmits<{
    close: []
    update: [IRadioStatus]
}>()

// methods
async function onSubmitted(formData: FormDataStatus) {
    const data = await $fetch<IRadioStatus>(`/api/radios-status/${props.status.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('update', data)
    emits('close')
}
</script>

<template>
    <FormStatus
        :status="status"
        @submitted="onSubmitted"
    />
</template>