<script setup lang="ts">
useHead({
  title: 'Usuarios',
})

definePageMeta({
    name: 'users',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const dialog = useDialogs()

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
    },
    {
        title: '',
        key: 'actions',
    }
]

const { page, data, search, refresh } = await useTableData<IUser>('/api/users')

function openCreate() {
    dialog.push({
        name: 'users-form',
        listeners: {
            onRefresh: refresh
        }
    })
}

function openUpdate(user: IUser) {
    dialog.push({
        name: 'users-form',
        props: {
            user
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(user: IUser) {
    dialog.confirmRemove({
        name: 'users',
        code: user.code,
        callback: refresh
    })
}
</script>

<template>
<main>
    <SkTable 
        :columns="columns"
        :table="data"
        v-model:search="search"
        v-model:page="page"
    >
        <template #toolbar>
            <button class="add-button" aria-label="create status" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell(group)="{ value }">
            <span class="sk-link">
                {{ value.name }}
            </span>
        </template>

        <template #cell(role)="{ value }">
            {{ getRoleByValue(value).name }}
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown 
                class="ml-auto"
                :options="[
                    {
                        key: 'edit',
                        ...ActionsStatic.UPDATE,
                        action: () => openUpdate(item)
                    },
                    {
                        key: 'delete',
                        ...ActionsStatic.DELETE,
                        action: () => openRemove(item)
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>