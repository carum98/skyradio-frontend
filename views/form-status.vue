<script setup lang="ts">
import { FormDataStatus } from '#imports'

const props = defineProps<{
    status?: IRadioStatus
}>()

// data
const form = reactive(props.status 
    ? FormDataStatus.update(props.status) 
    : FormDataStatus.create()
) as FormDataStatus
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/radios-status"
        path-update="/api/radios-status/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre del Estado"
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