<script setup lang="ts">
useHead({
  title: 'Modalidades',
})

definePageMeta({
    name: 'modalities'
})

const user = useUser()
const toast = useToast()

const { page, search, data, refresh } = await useTableData<IModality>('/api/clients-modality?per_page=20')
const { navigateToAction } = useActions(refresh)

const routerModal = useRouterModal()

// methods
function openProfile(modality: IModality) {
    routerModal.push({
        name: 'profile-modality',
        props: {
            code: modality.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        navigateToAction({
            name: 'create-modality',
        })
    } else {
        toast.open({
            title: 'No tienes permisos',
            message: 'La creación de modalidades solo está permitida para usuarios administradores',
            type: 'warning'
        })
    }
}

function openUpdate(modality: IModality) {
    navigateToAction({
        name: 'update-modality',
        props: {
            modality
        }
    })
}

function openRemove(modality: IModality) {
    navigateToAction({
        name: 'remove-modality',
        props: {
            code: modality.code
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
            <button class="add-button" aria-label="create modality" @click="openCreate">
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