<script setup lang="ts">
useHead({
  title: 'Estados',
})

definePageMeta({
    name: 'radios-status',
    middleware: ['roles'],
    roles: ['admin', 'user'],
})

const dialog = useDialogs()
const { isAdmin } = useRole()

const { page, search, data, refresh } = await useTableData<IRadioStatus>('/api/radios-status?per_page=20')

// methods
function openProfile(status: IRadioStatus) {
    dialog.push({
        name: 'status-profile',
        props: {
            code: status.code
        }
    })
}

function openCreate() {
    dialog.push({
        name: 'status-form',
        listeners: {
            onRefresh: refresh
        }
    })
}

function openUpdate(status: IRadioStatus) {
    dialog.push({
        name: 'status-form',
        props: {
            status
        },
        listeners: {
            onRefresh: refresh
        }
    })
}

function openRemove(status: IRadioStatus) {
    dialog.confirmRemove({
        name: 'status',
        code: status.code,
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
            <button class="add-button" aria-label="create status" @click="openCreate">
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