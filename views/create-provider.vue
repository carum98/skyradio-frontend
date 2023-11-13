<script setup lang="ts">
import { FormDataProvider } from '#imports'

const props = defineProps<{
    onCreated: (data: ISimProvider) => void
}>()

// methods
async function onSubmitted(formData: FormDataProvider) {
    const data = await $fetch<ISimProvider>('/api/sims-provider', {
        method: 'POST',
        body: formData.toParams(),
    })

    props.onCreated(data)
}
</script>

<template>
    <FormProvider
        @submitted="onSubmitted"
    />
</template>