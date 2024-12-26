<script setup lang="ts">
import { FormDataProvider } from '#imports'

const props = defineProps<{
    provider?: ISimProvider
}>()

// data
const form = reactive(props.provider 
    ? FormDataProvider.update(props.provider) 
    : FormDataProvider.create()
) as FormDataProvider
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/sims-provider"
        path-update="/api/sims-provider/:code"
    >
        <template #form="{ form }">
            <label required>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre del Proveedor"
                autofocus
                required
                minlength="3"
                maxlength="10"
                v-model="form.name" 
            />

            <label required>Color</label>
            <SkColorPicker 
                required
                v-model="form.color"
            />
        </template>
    </ScaffoldForm>
</template>