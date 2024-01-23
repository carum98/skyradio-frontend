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
    <ScaffoldForm
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
                required
                minlength="3"
                maxlength="10"
                v-model="form.name" 
            />

            <label>Color</label>
            <SkColorPicker 
                required
                v-model="form.color"
            />
        </template>
    </ScaffoldForm>
</template>