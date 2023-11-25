<script setup lang="ts">
definePageMeta({
    name: 'radios-model'
})

const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model')
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
    navigateToAction({
        name: 'create-model',
    })
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