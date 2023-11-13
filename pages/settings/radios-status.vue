<script setup lang="ts">
definePageMeta({
    name: 'radios-status'
})

const { page, search, data, refresh } = await useTableData<IRadioStatus>('/api/radios-status')
const { openRemoveInstance } = useRemoveInstance('Estado', refresh)

const { open: OpenCreate } = useModal({
    component: import('@views/create-status.vue'),
    listeners: {
        onCreated: () => refresh()
    }
})

const { open: OpenUpdate } = useModal({
    component: import('@views/update-status.vue'),
    listeners: {
        onUpdated: () => refresh()
    }
})
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
            <button class="add-button" @click="OpenCreate">
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
                        action: () => openRemoveInstance({ 
                            path: `/api/radios-status/${item.code}`,
                        })
                    },
                    {
                        key: 'edit',
                        label: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => OpenUpdate({ status: item })
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>