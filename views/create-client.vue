<script setup lang="ts">
const props = defineProps<{
    onCreated: (client: IClient) => void
}>()

// methods
async function onSubmitted(formData: FormDataClient) {
    const client = await $fetch<IClient>('/api/clients', {
        method: 'POST',
        body: formData.toParams(),
        onRequestError(context) {
            console.log(context.response)
        }
    })

    props.onCreated(client)
}
</script>

<template>
    <FormClient 
        @submitted="onSubmitted"
    />
</template>