<script setup lang="ts">
import { FormDataSeller } from '#imports'

const props = defineProps<{
    seller: ISeller 
    onUpdate: (data: ISeller) => void
}>()

// methods
async function onSubmitted(formData: FormDataSeller) {
    const data = await $fetch<ISeller>(`/api/sellers/${props.seller.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormSeller 
        :seller="seller"
        @submitted="onSubmitted"
    />
</template>