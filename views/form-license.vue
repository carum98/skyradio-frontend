<script setup lang="ts">
import { FormDataLicense } from '#imports'

const props = defineProps<{
    license?: ILicense
}>()

// data
const form = reactive(props.license
    ? FormDataLicense.update(props.license)
    : FormDataLicense.create()
) as FormDataLicense
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/licenses"
        path-update="/api/licenses/:code"
    >
        <template #form="{ form }">
            <label required>Licencia</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Licencia"
                autofocus
                required
                minlength="3"
                maxlength="20"
                v-model="form.key" 
            />
        </template>
    </ScaffoldForm>
</template>