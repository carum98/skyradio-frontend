<script setup lang="ts">
useHead({
  title: 'Proveedores de SIMs',
})

definePageMeta({
    name: 'sims-provider',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const dialog = useDialogs()
const { isAdmin } = useRole()

const { page, search, data, refresh } = await useTableData<ISimProvider>('/api/sims-provider?per_page=20')

// methods
function openProfile(provider: ISimProvider) {
    dialog.push({
        name: 'providers-profile',
        props: {
            code: provider.code
        }
    })
}

function openCreate() {
    dialog.push({
        name: 'providers-form',
        listeners: {
            onRefresh: refresh
        }
    })
}

function openUpdate(provider: ISimProvider) {
    dialog.push({
        name: 'providers-form',
        props: {
            provider
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(provider: ISimProvider) {
    dialog.confirmRemove({
        name: 'providers',
        code: provider.code,
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
            <button class="add-button" aria-label="create provider" @click="openCreate">
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
                    },
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>