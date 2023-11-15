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
    <ScafoldForm
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
                v-model="form.name" 
            />
        </template>
    </ScafoldForm>
</template>