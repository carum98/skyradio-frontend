<script setup lang="ts">
useHead({
  title: 'Vendedores',
})

definePageMeta({
    name: 'sellers'
})

const user = useUser()
const toast = useToast()

const { page, search, data, refresh } = await useTableData<ISeller>('/api/sellers?per_page=20')
const { navigateToAction } = useActions(refresh)

const routerModal = useRouterModal()

// methods
function openProfile(seller: ISeller) {
    routerModal.push({
        name: 'profile-seller',
        props: {
            code: seller.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        navigateToAction({
            name: 'create-seller',
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
    navigateToAction({
        name: 'update-seller',
        props: {
            seller
        }
    })
}

function openRemove(seller: ISeller) {
    navigateToAction({
        name: 'remove-seller',
        props: {
            code: seller.code
        }
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
                        key: 'delete',
                        ...ActionsStatic.DELETE,
                        action: () => openRemove(item)
                    },
                    {
                        key: 'edit',
                        ...ActionsStatic.UPDATE,
                        action: () => openUpdate(item)
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>