<script setup lang="ts">
useHead({
  title: 'Licencias',
})

definePageMeta({
    name: 'licenses',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const dialog = useDialogs()
const { isAdmin } = useRole()

const per_page = useTablePerPage({ sm: 20, lg: 30 })
const { page, search, data, refresh } = await useTableData<ILicense>(`/api/licenses?per_page=${per_page}`)

function openCreate() {
    dialog.push({
        name: 'licenses-form',
        listeners: {
            onRefresh: refresh
        }
    })
}

function openUpdate(license: ILicense) {
    dialog.push({
        name: 'licenses-form',
        props: {
            license
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(license: ILicense) {
    dialog.confirmRemove({
        name: 'licenses',
        code: license.code,
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
        >
            <template v-if="isAdmin" #toolbar>
                <button class="add-button" aria-label="create seller" @click="openCreate">
                    <IconsAdd />
                </button>
            </template>
    
            <template #cell="{ item }">
                {{ item.key }}

                <span class="badge-color" :style="{ backgroundColor: item.is_active ? 'green' : 'red' }"></span>
    
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