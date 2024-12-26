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
            <template v-if="!client">
                <label required>Cliente</label>
                <SelectClient 
                    show-clear
                    v-model="form.client"
                />
            </template>

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

            <label>Licencia</label>
            <SelectLicense
                show-clear
                v-model="form.license"
            />

            <small v-if="form.license?.is_active" class="text-muted">
                La licencia seleccionada se encuentra registrada en uso.
            </small>
        </template>
    </ScaffoldForm>
</template>