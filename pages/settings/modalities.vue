<script setup lang="ts">
useHead({
  title: 'Modalidades',
})

definePageMeta({
    name: 'modalities',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const dialog = useDialogs()
const { isAdmin } = useRole()

const { page, search, data, refresh } = await useTableData<IModality>('/api/clients-modality?per_page=20')

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
    dialog.push({
        name: 'modalities-form',
        listeners: {
            onRefresh: refresh
        }
    })
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
    dialog.confirmRemove({
        name: 'modalities',
        code: modality.code,
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
        <template v-if="isAdmin" #toolbar>
            <button class="add-button" aria-label="create modality" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell="{ item }">
            <span class="badge-color" :style="{ backgroundColor: item.color }"></span>

            {{ item.name }}

            <SkDropdown 
                v-if="isAdmin"
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