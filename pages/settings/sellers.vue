<script setup lang="ts">
definePageMeta({
    name: 'sellers'
})

const { page, search, data, refresh } = await useTableData<ISeller>('/api/sellers')
const { navigateToAction } = useActions(refresh)

// methods
function openProfile(seller: ISeller) {
    navigateTo({
        name: 'sellers-profile',
        params: {
            code: seller.code
        }
    })
}

function openCreate() {
    navigateToAction({
        name: 'create-seller',
    })
}

function openUpdate(seller: ISeller) {
    navigateToAction({
        name: 'update-seller',
        props: {
            seller
        }
    })
}

function openRemove(seller: ISeller) {
    navigateToAction({
        name: 'remove-seller',
        props: {
            code: seller.code
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