<script setup lang="ts">
import { FormDataProvider } from '#imports'

const props = defineProps<{
    provider: ISimProvider
}>()

const emits = defineEmits<{
    close: []
    update: [ISimProvider]
}>()

// methods
async function onSubmitted(formData: FormDataProvider) {
    const data = await $fetch<ISimProvider>(`/api/sims-provider/${props.provider.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('update', data)
    emits('close')
}
</script>

<template>
    <FormProvider
        :provider="provider"
        @submitted="onSubmitted"
    />
</template>