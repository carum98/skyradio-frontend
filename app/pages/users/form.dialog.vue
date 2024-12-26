<script setup lang="ts">
import { FormDataUser } from '#imports'

const props = defineProps<{
    user?: IUser
}>()

// data
const form = reactive(props.user 
    ? FormDataUser.update(props.user) 
    : FormDataUser.create()
) as FormDataUser

const isEdit = !!props.user
</script>

<template>
    <ScaffoldForm
        :form="form"
        v-bind="$attrs"
        path-create="/api/users"
        path-update="/api/users/:code"
    >
        <template #form="{ form }">
            <label>Nombre</label>
            <input 
                type="text" 
                class="sk-input"
                placeholder="Nombre del usuario"
                autofocus
                required
                minlength="3"
                maxlength="15"
                v-model="form.name" 
            />

            <label>Correo</label>
            <input 
                type="email" 
                class="sk-input"
                placeholder="Correo electrónico"
                required
                autocomplete="nope"
                v-model="form.email"
            />

            <label>Contraseña</label>
            <input 
                type="password" 
                class="sk-input"
                placeholder="Contraseña"
                :required="!isEdit"
                minlength="6"
                autocomplete="new-password"
                v-model="form.password"
            />

            <label>Rol</label>
            <SelectRoles 
                required 
                v-model="form.role"
            ></SelectRoles> 
        </template>
    </ScaffoldForm>
</template>