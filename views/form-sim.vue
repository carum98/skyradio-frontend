<script setup lang="ts">
import { FormDataSim } from '#imports'

const props = defineProps<{
    sim?: ISim
}>()

// data
const form = reactive(props.sim 
    ? FormDataSim.update(props.sim) 
    : FormDataSim.create()
) as FormDataSim
</script>

<template>
    <ScafoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/sims"
        path-update="/api/sims/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Número de la sim"
                autofocus
                v-model="form.number" 
            />

            <label>Serial</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Número de serie"
                v-model="form.serial"
            />

            <label>Proveedor</label>
            <SelectSimProvider 
                v-model="form.provider"
            />
        </template>
    </ScafoldForm>
</template>