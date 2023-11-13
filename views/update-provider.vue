<script setup lang="ts">
import { FormDataProvider } from '#imports'

const props = defineProps<{
    provider: ISimProvider
    onUpdate: (data: ISimProvider) => void
}>()

// methods
async function onSubmitted(formData: FormDataProvider) {
    const data = await $fetch<ISimProvider>(`/api/sims-provider/${props.provider.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormProvider
        :provider="provider"
        @submitted="onSubmitted"
    />
</template>