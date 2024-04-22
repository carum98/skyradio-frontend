<script setup lang="ts">
useHead({
  title: 'Modelos',
})

definePageMeta({
    name: 'radios-model',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const user = useUser()
const toast = useToast()
const dialog = useDialogs()

const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model?per_page=20')

// methods
function openProfile(model: IRadioModel) {
    dialog.push({
        name: 'models-profile',
        props: {
            code: model.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        dialog.push({
            name: 'models-form',
            listeners: {
                onRefresh: refresh
            }
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
    dialog.push({
        name: 'models-form',
        props: {
            model
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(model: IRadioModel) {
    dialog.confirmRemove({
        name: 'models',
        code: model.code,
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
            <button class="add-button" aria-label="create model" @click="openCreate">
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