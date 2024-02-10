<script setup lang="ts">
useHead({
  title: 'Estados',
})

definePageMeta({
    name: 'radios-status'
})

const user = useUser()
const toast = useToast()

const { page, search, data, refresh } = await useTableData<IRadioStatus>('/api/radios-status?per_page=20')
const { navigateToAction } = useActions(refresh)

const routerModal = useRouterModal()

// methods
function openProfile(status: IRadioStatus) {
    routerModal.push({
        name: 'profile-status',
        props: {
            code: status.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        navigateToAction({
            name: 'create-status',
        })
    } else {
        toast.open({
            title: 'No tienes permisos',
            message: 'La creación de estados solo está permitida para usuarios administradores',
            type: 'warning'
        })
    }
}

function openUpdate(status: IRadioStatus) {
    navigateToAction({
        name: 'update-status',
        props: {
            status
        }
    })
}

function openRemove(status: IRadioStatus) {
    navigateToAction({
        name: 'remove-status',
        props: {
            code: status.code
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