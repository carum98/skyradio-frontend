<script setup lang="ts">
import { FormDataModality } from '#imports'

const props = defineProps<{
    modality?: IModality
}>()

// data
const form = reactive(props.modality 
    ? FormDataModality.update(props.modality) 
    : FormDataModality.create()
) as FormDataModality
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/clients-modality"
        path-update="/api/clients-modality/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre de la Modalidad"
                autofocus
                required
                minlength="3"
                maxlength="15"
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