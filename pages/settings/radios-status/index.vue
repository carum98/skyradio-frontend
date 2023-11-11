<script setup lang="ts">
definePageMeta({
    name: 'radios-status'
})

const { page, search, data, refresh } = await useTableData<IRadioStatus>('/api/radios-status')
const { openRemoveInstance } = useRemoveInstance('Estado', refresh)

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/radios-status/create.vue'),
    props: {
        onCreated(_client: IRadioStatus) {
            refresh()
            close()
        }
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
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>