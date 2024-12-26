<script setup lang="ts">
useHead({
  title: 'Vendedores',
})

definePageMeta({
    name: 'sellers',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const dialog = useDialogs()
const { isAdmin } = useRole()

const { page, search, data, refresh } = await useTableData<ISeller>('/api/sellers?per_page=20')

// methods
function openProfile(seller: ISeller) {
    dialog.push({
        name: 'sellers-profile',
        props: {
            code: seller.code
        }
    })
}

function openCreate() {
    dialog.push({
        name: 'sellers-form',
        listeners: {
            onRefresh: refresh
        }
    })
}

function openUpdate(seller: ISeller) {
    dialog.push({
        name: 'sellers-form',
        props: {
            seller
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(seller: ISeller) {
    dialog.confirmRemove({
        name: 'sellers',
        code: seller.code,
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
            <button class="add-button" aria-label="create seller" @click="openCreate">
                <IconsAdd />
            </button>
        </template>

        <template #cell="{ item }">
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