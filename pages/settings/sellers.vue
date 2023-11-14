<script setup lang="ts">
definePageMeta({
    name: 'sellers'
})

const { page, search, data, refresh } = await useTableData<ISeller>('/api/sellers')
const { navigateToAction } = useActions(refresh)

// methods
function openCreate() {
    navigateToAction({
        name: 'create-seller',
    })
}

function openUpdate(seller: IRadioStatus) {
    navigateToAction({
        name: 'update-seller',
        props: {
            seller
        }
    })
}

function openRemove(seller: IRadioStatus) {
    navigateToAction({
        name: 'remove-seller',
        props: {
            path: `/api/sellers/${seller.code}`,
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