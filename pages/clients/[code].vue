<script setup lang="ts">
definePageMeta({
    name: 'clients-profile',
    pageTransition: false,
})

const chartType = ref('models')
const listType = ref('radios')

const route = useRoute()
const dialog = useDialogs()

const code = route.params.code as string

// data
const { data: clients } = useNuxtData<ITable<IClient>>('clients')

const { data: client, refresh } = await useFetch(`/api/clients/${code}`, {
    key: `clients-${code}`,
    getCachedData: () => clients.value?.data.find(client => client.code === code) as IClient
})

const { data: stats, refresh: refreshStats } = await useFetch<IClientStats>(`/api/clients/${code}/stats`)

function updateConsole() {
    dialog.push({
        name: 'consoles-form',
        props: {
            console: client.value?.console,
        },
        listeners: {
            onRefresh: refresh
        }
    })
}
</script>

<template>
    <main>
        <section class="header-companies-profile mb-1">
            <div class="sk-card sk-card--flex-column">
                <div class="d-flex">
                    <SkAvatar 
                        v-if="client"  
                        :alt="client.name"
                        :color="client.color" 
                        class="mr-1"
                    />

                    <h2>{{ client?.name }}</h2>
                </div>

                <p>
                    Vendedor:
                    <SkLinkDialog
                        v-if="client?.seller"
                        name="sellers-profile"
                        :props="{ code: client.seller.code }"
                        class="sk-link"
                    >
                        {{ client.seller.name }}
                    </SkLinkDialog> 
                </p>

                <p v-if="client?.modality">
                    Modalidad:
                    <SkLinkDialog
                        name="modalities-profile"
                        :props="{ code: client.modality.code }"
                        class="sk-link"
                    >
                        <span class="badge-color" :style="{ backgroundColor: client.modality.color }"></span>
                        {{ client.modality.name  }}
                    </SkLinkDialog>
                </p>

                <p>
                    Consola:
                    <button class="sk-link" @click="updateConsole">
                        <span class="badge-color" :style="{ backgroundColor: client?.console != null ? 'green' : 'red' }"></span>
                        {{ client?.console != null ? 'Habilitada' : 'Deshabilitada' }}
                    </button>
                </p>

                <ActionsDropdownClient
                    v-if="client"
                    :client="client"
                    :refresh="refresh"
                    show-logs
                />
            </div>

            <div v-if="stats">
                <SkSwitch 
                    class="mb-1"
                    v-model="chartType"
                    :items="[
                        { label: 'Modelos', value: 'models' },
                        { label: 'Provedores', value: 'providers' }
                    ]"
                ></SkSwitch>
                <SkChart
                    v-if="chartType === 'models'"
                    :data="stats.models" 
                />
                <SkChart 
                    v-if="chartType === 'providers'"
                    :data="stats.sims_providers"
                />
            </div>
        </section>

        <SkSwitch 
            class="mb-1 mx-auto"
            v-model="listType"
            :items="[
                { label: 'Radios', value: 'radios' },
                { label: 'Aplicaciones', value: 'apps' }
            ]"
        ></SkSwitch>

        <TableRadios
            v-if="listType === 'radios'"
            :path="`/api/clients/${code}/radios?per_page=7`"
            enable-table-actions
            enable-client-actions
            hide-client
            hide-stats-button
            @refresh="refreshStats"
        >
            <template #actions="{ openSwap, openRemove, openAdd, hasData }">
                <div class="table-actions">
                <button 
                    v-sk-tooltip="ActionsStatic.CHANGE.name"
                    class="button-actions" 
                    :disabled="!hasData"
                    :style="{ '--color': ActionsStatic.CHANGE.color }"
                    @click="() => openSwap({ client, radio: null })"
                >
                    <span v-html="ActionsStatic.CHANGE.icon"></span>
                </button>
                <button 
                    v-sk-tooltip="ActionsStatic.REMOVE.name"
                    class="button-actions" 
                    :disabled="!hasData"
                    :style="{ '--color': ActionsStatic.REMOVE.color }"
                    @click="() => openRemove({ client, radio: null })"
                >
                    <span v-html="ActionsStatic.REMOVE.icon"></span>
                </button>
                <button 
                    v-sk-tooltip="ActionsStatic.ADD.name"
                    class="button-actions"
                    :style="{ '--color': ActionsStatic.ADD.color }"
                    @click="() => openAdd(client)"
                >
                    <span v-html="ActionsStatic.ADD.icon"></span>
                </button>
            </div>
            </template>
        </TableRadios>

        <TableApps
            v-if="listType === 'apps'"
            :path="`/api/clients/${code}/apps?per_page=7`"
            hide-client
        ></TableApps>
    </main>
</template>

<style>
.header-companies-profile {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 35px;
}
</style>

<style scoped>
.sk-avatar {
    view-transition-name: avatar;
}
</style>
