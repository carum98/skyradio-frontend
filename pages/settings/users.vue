<script setup lang="ts">
useHead({
  title: 'Usuarios',
})

definePageMeta({
    name: 'users'
})

const columns = [
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'Correo',
        key: 'email'
    },
    {
        title: 'Rol',
        key: 'role'
    },
    {
        title: 'Grupo',
        key: 'group'
    }
]

const { page, data, search } = await useTableData<IUser>('/api/users')
</script>

<template>
<main>
    <SkTable 
        :columns="columns"
        :table="data"
        v-model:search="search"
        v-model:page="page"
    >
        <template #cell(group)="{ value }">
            <span class="sk-link">
                {{ value.name }}
            </span>
        </template>
    </SkTable>
</main>
</template>