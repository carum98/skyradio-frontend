<script setup lang="ts">
useHead({
  title: 'Proveedores de SIMs',
})

definePageMeta({
    name: 'sims-provider'
})

const user = useUser()
const toast = useToast()

const { page, search, data, refresh } = await useTableData<ISimProvider>('/api/sims-provider?per_page=20')
const { navigateToAction } = useActions(refresh)

const routerModal = useRouterModal()

// methods
function openProfile(provider: ISimProvider) {
    routerModal.push({
        name: 'profile-provider',
        props: {
            code: provider.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        navigateToAction({
            name: 'create-provider',
        })
    } else {
        toast.open({
            title: 'No tienes permisos',
            message: 'La creación de proveedores solo está permitida para usuarios administradores',
            type: 'warning'
        })
    }
}

function openUpdate(provider: ISimProvider) {
    navigateToAction({
        name: 'update-provider',
        props: {
            provider
        }
    })
}

function openRemove(provider: ISimProvider) {
    navigateToAction({
        name: 'remove-provider',
        props: {
            code: provider.code
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
            <button class="add-button" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell="{ item }">
            <span class="badge-color" :style="{ backgroundColor: item.color }"></span>

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