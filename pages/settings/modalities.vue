<script setup lang="ts">
definePageMeta({
    name: 'modalities'
})

const { page, search, data, refresh } = await useTableData<IModality>('/api/clients-modality')
const { openRemoveInstance } = useRemoveInstance('Modalidad', refresh)

const { open: OpenCreate, close } = useModal({
    component: import('@views/create-modality.vue'),
    props: {
        onCreated(_data: IModality) {
            refresh()
            close()
        }
    }
})

const { open: OpenUpdate, close: CloseUpdate } = useModal({
    component: import('@views/update-modality.vue'),
    props: {
        onUpdate(_data: IModality) {
            refresh()
            CloseUpdate()
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
                            path: `/api/clients-modality/${item.code}`,
                        })
                    },
                    {
                        key: 'edit',
                        label: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => OpenUpdate({ modality: item })
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>