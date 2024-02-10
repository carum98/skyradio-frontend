<script setup lang="ts">
useHead({
  title: 'Modelos',
})

definePageMeta({
    name: 'radios-model'
})

const user = useUser()
const toast = useToast()

const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model?per_page=20')
const { navigateToAction } = useActions(refresh)

const routerModal = useRouterModal()

// methods
function openProfile(model: IRadioModel) {
    routerModal.push({
        name: 'profile-model',
        props: {
            code: model.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        navigateToAction({
            name: 'create-model',
        })
    } else {
        toast.open({
            title: 'No tienes permisos',
            message: 'La creación de modelos solo está permitida para usuarios administradores',
            type: 'warning'
        })
    }
}

function openUpdate(model: IRadioModel) {
    navigateToAction({
        name: 'update-model',
        props: {
            model
        }
    })
}

function openRemove(model: IRadioModel) {
    navigateToAction({
        name: 'remove-model',
        props: {
            code: model.code
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