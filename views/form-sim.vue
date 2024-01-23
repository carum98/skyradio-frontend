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
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/sims"
        path-update="/api/sims/:code"
    >
        <template #form="{ form }">
            <label>Numero</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Número de la sim"
                autofocus
                required
                minlength="3"
                maxlength="12"
                v-model="form.number" 
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

            <label>Proveedor</label>
            <SelectSimProvider 
                required
                v-model="form.provider"
            />
        </template>
    </ScaffoldForm>
</template>