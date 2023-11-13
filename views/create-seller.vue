<script setup lang="ts">
import { FormDataSeller } from '#imports'

const props = defineProps<{
    onCreated: (data: ISeller) => void
}>()

// methods
async function onSubmitted(formData: FormDataSeller) {
    const data = await $fetch<ISeller>('/api/sellers', {
        method: 'POST',
        body: formData.toParams(),
    })

    props.onCreated(data)
}
</script>

<template>
    <FormSeller 
        @submitted="onSubmitted"
    />
</template>