<script setup lang="ts">
useHead({
  title: 'Licencias',
})

definePageMeta({
    name: 'licenses'
})

const { page, search, data, refresh } = await useTableData<ILicense>('/api/licenses?per_page=20')
const dialog = useDialogs()
const { navigateToAction } = useActions(refresh)

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
    navigateToAction({
        name: 'remove-license',
        props: {
            code: license.code
        }
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
            <template #toolbar>
                <button class="add-button" aria-label="create seller" @click="openCreate">
                    <IconsAdd />
                </button>
            </template>
    
            <template #cell="{ item }">
                {{ item.key }}
    
                <SkDropdown 
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