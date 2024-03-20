<script setup lang="ts">
import { FormDataConsole } from '#imports'

const props = defineProps<{
    license?: IConsole
    client: IClient
}>()

// data
const form = reactive(props.license
    ? FormDataConsole.update(props.license)
    : FormDataConsole.create()
) as FormDataConsole
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        :path-create="`/api/clients/${client.code}/console`"
        path-update="/api/consoles/:code"
    >
        <template #form="{ form }">
            <label required>Licencia</label>
            <SelectLicense
                required
                v-model="form.license"
            />
        </template>
    </ScaffoldForm>
</template>