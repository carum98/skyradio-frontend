<script setup lang="ts">
useHead({
  title: 'Vendedores',
})

definePageMeta({
    name: 'sellers',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const user = useUser()
const toast = useToast()
const dialog = useDialogs()

const { page, search, data, refresh } = await useTableData<ISeller>('/api/sellers?per_page=20')

// methods
function openProfile(seller: ISeller) {
    dialog.push({
        name: 'sellers-profile',
        props: {
            code: seller.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        dialog.push({
            name: 'sellers-form',
            listeners: {
                onRefresh: refresh
            }
        })
    } else {
        toast.open({
            title: 'No tienes permisos',
            message: 'La creación de vendedores solo está permitida para usuarios administradores',
            type: 'warning'
        })
    }
}

function openUpdate(seller: ISeller) {
    dialog.push({
        name: 'sellers-form',
        props: {
            seller
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(seller: ISeller) {
    dialog.confirmRemove({
        name: 'sellers',
        code: seller.code,
        callback: refresh
    })
}
</script>

<template>
<main>
    <SkTable
        gridView
        :table="data" 
        v-model:search="search"
        v-model:page="page"
        hover
        @onRowClick="openProfile"
    >
        <template #toolbar>
            <button class="add-button" aria-label="create seller" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell="{ item }">
            {{ item.name }}

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