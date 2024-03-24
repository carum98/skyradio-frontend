<script setup lang="ts">
import { FormDataApp } from '#imports'

const props = defineProps<{
    app?: IApp
    client?: IClient
}>()

const pathCreate = props.client
    ? `/api/clients/${props.client.code}/apps`
    : '/api/apps'

// data
const form = reactive(props.app
    ? FormDataApp.update(props.app) 
    : FormDataApp.create()
) as FormDataApp
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        :path-create="pathCreate"
        path-update="/api/apps/:code"
    >
        <template #form="{ form }">
            <label required>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre"
                autofocus
                required
                minlength="3"
                maxlength="50"
                v-model="form.name" 
            />

            <label required>Licencia</label>
            <SelectLicense
                required
                show-clear
                v-model="form.license"
            />

            <template v-if="!client">
                <label required>Cliente</label>
                <SelectClient 
                    show-clear
                    v-model="form.client"
                />
            </template>
        </template>
    </ScaffoldForm>
</template>