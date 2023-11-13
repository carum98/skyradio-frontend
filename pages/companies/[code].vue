<script setup lang="ts">
import type { SkTableColumn } from '@components/SkTable/sk-table'

definePageMeta({
    name: 'companies-profile'
})

const columns: SkTableColumn[] = [
    {
        title: 'Nombre',
        key: 'name'
    },
    {
        title: 'IMEI',
        key: 'imei',
    },
    {
        title: 'Serial',
        key: 'serial',
    },
    {
        title: 'Modelo',
        key: 'model',
        formatter: (value: IRadioModel | null) => value?.name ?? '-'
    },
    {
        title: 'Sim / Proveedor',
        key: 'sim',
    },
    {
        title: '',
        key: 'actions',
        width: 65,
        align: 'center',
    }
]
const route = useRoute()
const router = useRouter()

// data
const { data: client, refresh: refreshData } = await useFetch<IClient>(`/api/clients/${route.params.code}`)

const { page, data, search, refresh } = await useTableData<IRadio>(`/api/clients/${route.params.code}/radios`)
const { OpenAdd, OpenRemove, OpenSwap } = useActions(refresh)
const { openRemoveInstance } = useRemoveInstance('Cliente', () => router.back())

const { open: OpenUpdate } = useModal({
    component: import('@views/update-client.vue'),
    props: {
        onUpdate(_client: IClient) {
            refreshData()
        }
    }
})

// methods
function onUpdate() {
    OpenUpdate({ client: toRaw(client.value) })
}
</script>

<template>
    <main>
        <section class="header-companies-profile">
            <div>
                <h2>{{ client?.name }}</h2>
                <p>{{ client?.seller?.name ?? 'Sin vendedor' }}</p>
                <p>{{ client?.modality.name }}</p>

                <button class="sk-button" @click="onUpdate">
                    Editar
                </button>

                <button class="sk-button">
                    Historial
                </button>

                <SkDropdown 
                    :options="[
                        {
                            key: 'remove',
                            label: ActionsStatic.DELETE.name,
                            icon: ActionsStatic.DELETE.icon,
                            color: ActionsStatic.DELETE.color,
                            action: () => openRemoveInstance({ 
                                path: `/api/clients/${client?.code}`,
                            })
                        }
                    ]"
                ></SkDropdown>
            </div>
            <div>

            </div>
        </section>
        <SkTable 
            :table="data"
            :columns="columns"
            v-model="search"
            @onPage="page = $event"
        >
            <template #actions>
                <div class="table-actions">
                    <button 
                        class="button-actions" 
                        :style="{ '--color': ActionsStatic.CHANGE.color }"
                        @click="() => OpenSwap({ client })"
                    >
                        <span v-html="ActionsStatic.CHANGE.icon"></span>
                    </button>
                    <button 
                        class="button-actions" 
                        :style="{ '--color': ActionsStatic.REMOVE.color }"
                        @click="() => OpenRemove({ client })"
                    >
                        <span v-html="ActionsStatic.REMOVE.icon"></span>
                    </button>
                    <button 
                        class="button-actions"
                        :style="{ '--color': ActionsStatic.ADD.color }"
                        @click="() => OpenAdd({ client })"
                    >
                        <span v-html="ActionsStatic.ADD.icon"></span>
                    </button>
                </div>
            </template>

            <template #cell(sim)="{ value }">
                <p>{{ value?.number }}</p>
                <p>{{ value?.provider?.name }}</p>
            </template>

            <template #cell(actions)="{ item }">
                <SkDropdown :options="[
                    {
                        key: 'swap',
                        label: ActionsStatic.CHANGE.name,
                        icon: ActionsStatic.CHANGE.icon,
                        color: ActionsStatic.CHANGE.color,
                        action: () => OpenSwap({ client, radio: item })
                    },
                    {
                        key: 'remove',
                        label: ActionsStatic.REMOVE.name,
                        icon: ActionsStatic.REMOVE.icon,
                        color: ActionsStatic.REMOVE.color,
                        action: () => OpenRemove({ client, radio: item })
                    }
                ]" />
            </template>
        </SkTable>
    </main>
</template>

<style scoped>
.header-companies-profile {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 25px;
    margin-bottom: 25px;

    & > div {
        background-color: var(--table-color);
        padding: 1.5rem;
        border-radius: 15px;
    }
}
</style>
