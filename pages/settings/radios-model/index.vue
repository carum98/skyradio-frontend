<script setup lang="ts">
definePageMeta({
    name: 'radios-model'
})

const { page, search, data, refresh } = await useTableData<IRadioModel>('/api/radios-model')
const { openRemoveInstance } = useRemoveInstance('Modelo', refresh)

const { open: OpenCreate, close } = useModal({
    component: import('@pages/settings/radios-model/create.vue'),
    props: {
        onCreated(_client: IRadioModel) {
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
                            path: `/api/radios-model/${item.code}`,
                        })
                    }
                ]"
            ></SkDropdown>
        </template>
    </SkTable>
</main>
</template>