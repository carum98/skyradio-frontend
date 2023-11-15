<script setup lang="ts">
import { FormDataRadio } from '#imports'

const props = defineProps<{
    radio?: IRadio
}>()

// data
const form = reactive(props.radio 
    ? FormDataRadio.update(props.radio) 
    : FormDataRadio.create()
) as FormDataRadio
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/radios"
        path-update="/api/radios/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre del radio"
                autofocus
                v-model="form.name" 
            />

            <label>IMEI</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="IMEI"
                v-model="form.imei"
            />

            <label>Serial</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Número de serie"
                v-model="form.serial"
            />

            <label>Modelo</label>
            <SelectRadioModel
                v-model="form.model"
            />
        </template>
    </ScaffoldForm>
</template>