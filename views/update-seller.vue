<script setup lang="ts">
import { FormDataSeller } from '#imports'

const props = defineProps<{
    seller: ISeller 
}>()

const emits = defineEmits<{
    close: []
    update: [ISeller]
}>()

// methods
async function onSubmitted(formData: FormDataSeller) {
    const data = await $fetch<ISeller>(`/api/sellers/${props.seller.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('update', data)
    emits('close')
}
</script>

<template>
    <FormSeller 
        :seller="seller"
        @submitted="onSubmitted"
    />
</template>