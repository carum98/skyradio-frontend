<script setup lang="ts">
useHead({
  title: 'Modalidades',
})

definePageMeta({
    name: 'modalities'
})

const user = useUser()
const toast = useToast()
const dialog = useDialogs()

const { page, search, data, refresh } = await useTableData<IModality>('/api/clients-modality?per_page=20')
const { navigateToAction } = useActions(refresh)

// methods
function openProfile(modality: IModality) {
    dialog.push({
        name: 'modalities-profile',
        props: {
            code: modality.code
        }
    })
}

function openCreate() {
    if (user.value?.role === 'admin') {
        dialog.push({
            name: 'modalities-form',
            listeners: {
                onRefresh: refresh
            }
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
    dialog.push({
        name: 'modalities-form',
        props: {
            modality
        },
        listeners: {
            onRefresh: refresh
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