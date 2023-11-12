<script setup lang="ts">
const props = defineProps<{
    client: IClient
    onUpdate: (client: IClient) => void
}>()

// methods
async function onSubmitted(formData: FormDataClient) {
    const client = await $fetch<IClient>(`/api/clients/${props.client.code}`, {
        method: 'PUT',
        body: formData.toParams(),
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onUpdate(client)
}
</script>

<template>
    <FormClient 
        :client="client"
        @submitted="onSubmitted"
    />
</template>