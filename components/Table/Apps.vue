<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

const props = withDefaults(defineProps<{
    path: string
    hideClient?: boolean
}>(), {
    hideClient: false,
})

const columns = ref<SkTableColumn[]>([
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'Licencia',
        key: 'license',
        width: 150,
        align: 'center',
    },
    {
        title: 'Cliente',
        key: 'client',
        show: !props.hideClient,
        width: 300,
        align: 'center',
    },
    {
        title: '',
        altTitle: 'Acciones',
        key: 'actions',
        width: 65,
        align: 'center',
    }
])

const { page, search, data, refresh, query } = await useTableData<IApp>(props.path)
</script>

<template>
    <SkTable
        :table="data" 
        :columns="columns"
        v-model:search="search"
        v-model:page="page"
    >
        <template #cell(license)="{ value }">
            <button class="sk-link">
                {{ value?.key }}
            </button>
        </template>

        <template #cell(client)="{ value }">
            <NuxtLink 
                v-if="value"
                :to="{ name: 'clients-profile', params: { code: value.code } }"
                @click.native.stop
                class="sk-link text-ellipsis"
            >
                <span class="badge-color" :style="{ backgroundColor: value.color }"></span>
                {{ value.name }}
            </NuxtLink>
        </template>

        <template #cell(actions)="{ item }">
            <SkDropdown 
                :options="[]" 
            ></SkDropdown>
        </template>
    </SkTable>
</template>