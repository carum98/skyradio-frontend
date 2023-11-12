<script setup lang="ts">
import { FormDataClient } from '@utils/form-data-clients'

const props = defineProps<{
    client: IClient
    onUpdate: (data: IClient) => void
}>()

// methods
async function onSubmitted(formData: FormDataClient) {
    const data = await $fetch<IClient>(`/api/clients/${props.client.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormClient 
        :client="client"
        @submitted="onSubmitted"
    />
</template>