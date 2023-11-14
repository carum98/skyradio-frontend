<script setup lang="ts">
import { FormDataModel } from '#imports'

const props = defineProps<{
    model: IRadioModel
}>()

const emits = defineEmits<{
    close: []
    refresh: [IRadioModel]
}>()

// methods
async function onSubmitted(formData: FormDataModel) {
    const data = await $fetch<IRadioModel>(`/api/radios-model/${props.model.code}`, {
        method: 'PUT',
        body: formData.toParams(),
    })

    emits('refresh', data)
    emits('close')
}
</script>

<template>
    <FormModel
        :model="model"
        @submitted="onSubmitted"
    />
</template>