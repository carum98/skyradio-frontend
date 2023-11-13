<script setup lang="ts">
import { FormDataModel } from '#imports'

const props = defineProps<{
    model: IRadioModel
    onUpdate: (data: IRadioModel) => void
}>()

// methods
async function onSubmitted(formData: FormDataModel) {
    const data = await $fetch<IRadioModel>(`/api/radios-model/${props.model.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    props.onUpdate(data)
}
</script>

<template>
    <FormModel
        :model="model"
        @submitted="onSubmitted"
    />
</template>