<script setup lang="ts">
import { FormDataClient } from '#imports'

const props = defineProps<{
    client?: IClient
}>()

// data
const form = reactive(props.client 
    ? FormDataClient.update(props.client) 
    : FormDataClient.create()
) as FormDataClient
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/clients"
        path-update="/api/clients/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre de la Compañía"
                autofocus
                required
                minlength="3"
                maxlength="50"
                v-model="form.name" 
            />

            <label>Modalidad</label>
            <SelectModality 
                required
                v-model="form.modality" 
            />

            <label>Vendedor</label>
            <SelectSeller 
                required
                v-model="form.seller" 
            />

            <label>Color</label>
            <SkColorPicker 
                required
                v-model="form.color"
            />
        </template>
    </ScaffoldForm>
</template>