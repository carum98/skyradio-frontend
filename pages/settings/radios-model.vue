<script setup lang="ts">
definePageMeta({
    name: 'radios-model'
})

const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model')
const { navigateToAction } = useActions(refresh)

// methods
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
        @onPage="page = $event"
    >
        <template #toolbar>
            <button class="add-button" @click="openCreate">
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
                        label: ActionsStatic.DELETE.name,
                        icon: ActionsStatic.DELETE.icon,
                        color: ActionsStatic.DELETE.color,
                        action: () => openRemove(item)
                    },
                    {
                        key: 'edit',
                        label: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => openUpdate(item)
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>