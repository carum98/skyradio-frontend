<script setup lang="ts">
import { FormDataClient } from '#imports'

const props = defineProps<{
    client: IClient
}>()

const emits = defineEmits<{
    close: []
    update: [IClient]
}>()

// methods
async function onSubmitted(formData: FormDataClient) {
    const data = await $fetch<IClient>(`/api/clients/${props.client.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('update', data)
    emits('close')
}
</script>

<template>
    <FormClient 
        :client="client"
        @submitted="onSubmitted"
    />
</template>