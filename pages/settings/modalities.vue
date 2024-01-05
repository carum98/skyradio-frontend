<script setup lang="ts">
useHead({
  title: 'Modalidades',
})

definePageMeta({
    name: 'modalities'
})

const { page, search, data, refresh } = await useTableData<IModality>('/api/clients-modality')
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
    navigateToAction({
        name: 'create-modality',
    })
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
        v-model="search"
        hover
        @onRowClick="openProfile"
        @onPage="page = $event"
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