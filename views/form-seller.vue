<script setup lang="ts">
import { FormDataSeller } from '#imports'

const props = defineProps<{
    seller?: ISeller
}>()

// data
const form = reactive(props.seller 
    ? FormDataSeller.update(props.seller) 
    : FormDataSeller.create()
) as FormDataSeller
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/sellers"
        path-update="/api/sellers/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre del Vendedor"
                autofocus
                required
                minlength="3"
                maxlength="20"
                v-model="form.name" 
            />
        </template>
    </ScaffoldForm>
</template>