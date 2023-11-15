<script setup lang="ts">
import { FormDataModel } from '#imports'

const props = defineProps<{
    model?: IRadioModel
}>()

// data
const form = reactive(props.model 
    ? FormDataModel.update(props.model) 
    : FormDataModel.create()
) as FormDataModel
</script>

<template>
    <ScafoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/radios-model"
        path-update="/api/radios-model/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre del Modelo"
                autofocus
                v-model="form.name" 
            />
        </template>
    </ScafoldForm>
</template>