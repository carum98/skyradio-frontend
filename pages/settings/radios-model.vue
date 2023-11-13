<script setup lang="ts">
definePageMeta({
    name: 'radios-model'
})

const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model')
const { openRemoveInstance } = useRemoveInstance('Modelo', refresh)

const { open: OpenCreate, close } = useModal({
    component: import('@views/create-model.vue'),
    props: {
        onCreated(_data: IRadioModel) {
            refresh()
            close()
        }
    }
})

const { open: OpenUpdate, close: CloseUpdate } = useModal({
    component: import('@views/update-model.vue'),
    props: {
        onUpdate(_data: IRadioModel) {
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
                            path: `/api/radios-model/${item.code}`,
                        })
                    },
                    {
                        key: 'edit',
                        label: ActionsStatic.UPDATE.name,
                        icon: ActionsStatic.UPDATE.icon,
                        color: ActionsStatic.UPDATE.color,
                        action: () => OpenUpdate({ model: item })
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>