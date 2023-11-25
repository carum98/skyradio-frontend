<script setup lang="ts">
definePageMeta({
    name: 'radios-status'
})

const { page, search, data, refresh } = await useTableData<IRadioStatus>('/api/radios-status')
const { navigateToAction } = useActions(refresh)

// methods
function openCreate() {
    navigateToAction({
        name: 'create-status',
    })
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
        v-model="search"
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