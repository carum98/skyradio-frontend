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
                minlength="3"
                maxlength="50"
                v-model="form.name" 
            />

            <label required>IMEI</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="IMEI"
                minlength="15"
                maxlength="15"
                required
                v-model="form.imei"
            />

            <label>Serial</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Número de serie"
                minlength="3"
                maxlength="15"
                v-model="form.serial"
            />

            <label required>Modelo</label>
            <SelectRadioModel
                required
                v-model="form.model"
            />
        </template>
    </ScaffoldForm>
</template>